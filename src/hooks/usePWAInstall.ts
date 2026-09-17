import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function getPublicStoreUrl(): string {
  if (typeof window === 'undefined') {
    return 'https://ais-pre-63tx2aewjho66flkscv7hz-810186989816.europe-west2.run.app';
  }
  const current = window.location.origin;
  // If in internal dev container, use the shared preview URL so friends without dev cookies can open it seamlessly
  if (current.includes('ais-dev-')) {
    return current.replace('ais-dev-', 'ais-pre-');
  }
  return current;
}

// Global prompt storage so the event is captured even if fired before React components mount
let globalDeferredPrompt: BeforeInstallPromptEvent | null = null;
const promptSubscribers = new Set<(prompt: BeforeInstallPromptEvent | null) => void>();

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e: Event) => {
    // Prevent Chromium 67 and earlier from automatically showing the prompt
    e.preventDefault();
    globalDeferredPrompt = e as BeforeInstallPromptEvent;
    try {
      (window as any).__deferredInstallPrompt = e;
    } catch {}
    promptSubscribers.forEach((cb) => cb(globalDeferredPrompt));
  });

  window.addEventListener('appinstalled', () => {
    globalDeferredPrompt = null;
    try {
      (window as any).__deferredInstallPrompt = null;
    } catch {}
    promptSubscribers.forEach((cb) => cb(null));
  });
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(() => {
    if (globalDeferredPrompt) return globalDeferredPrompt;
    if (typeof window !== 'undefined' && (window as any).__deferredInstallPrompt) {
      return (window as any).__deferredInstallPrompt;
    }
    return null;
  });
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [installOutcome, setInstallOutcome] = useState<'idle' | 'accepted' | 'dismissed'>('idle');

  useEffect(() => {
    // Check if running in standalone window
    const isStandalone =
      typeof window !== 'undefined' &&
      (window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
        document.referrer.includes('android-app://'));
    setIsInstalled(Boolean(isStandalone));

    // Check if iOS device
    if (typeof window !== 'undefined') {
      const ua = window.navigator.userAgent.toLowerCase();
      setIsIOS(/iphone|ipad|ipod/.test(ua));
    }

    const handlePromptUpdate = (prompt: BeforeInstallPromptEvent | null) => {
      setDeferredPrompt(prompt);
    };

    promptSubscribers.add(handlePromptUpdate);

    // If global already had it
    if (globalDeferredPrompt) {
      setDeferredPrompt(globalDeferredPrompt);
    }

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      globalDeferredPrompt = null;
      setInstallOutcome('accepted');
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      promptSubscribers.delete(handlePromptUpdate);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Trigger browser's native beforeinstallprompt dialog
  const install = async (): Promise<{ success: boolean; outcome?: 'accepted' | 'dismissed' }> => {
    const promptToUse = deferredPrompt || globalDeferredPrompt || (typeof window !== 'undefined' ? (window as any).__deferredInstallPrompt : null);
    
    if (!promptToUse) {
      return { success: false };
    }

    try {
      // Show the install prompt
      await promptToUse.prompt();
      // Wait for the user to respond to the prompt
      const choice = await promptToUse.userChoice;
      setInstallOutcome(choice.outcome);

      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
        setDeferredPrompt(null);
        globalDeferredPrompt = null;
        try {
          (window as any).__deferredInstallPrompt = null;
        } catch {}
        return { success: true, outcome: 'accepted' };
      }
      return { success: false, outcome: 'dismissed' };
    } catch (err) {
      console.error('PWA install prompt error:', err);
      return { success: false };
    }
  };

  // Generate and download a standalone, shareable portable Desktop Web App launcher file (.html)
  // FIXED: No longer uses <iframe src="..."> which modern browsers block with broken page icon on file:// protocol.
  const downloadPortableAppFile = () => {
    const publicUrl = getPublicStoreUrl();
    const appHtmlContent = `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- Instant redirection to the live store without any iframe restrictions -->
  <meta http-equiv="refresh" content="1; url=${publicUrl}" />
  <title>TKR Express Hub - ওপেন হচ্ছে...</title>
  <link rel="icon" href="${publicUrl}/favicon.ico" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Hind Siliguri", sans-serif;
      background: #090d16;
      color: #f8fafc;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      text-align: center;
    }
    .card {
      background: #0f172a;
      border: 1px solid #1e293b;
      border-radius: 24px;
      padding: 36px 28px;
      max-width: 520px;
      width: 100%;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(16, 185, 129, 0.1);
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      border-radius: 9999px;
      background: rgba(16, 185, 129, 0.15);
      color: #34d399;
      font-size: 12px;
      font-weight: 700;
      margin-bottom: 20px;
      border: 1px solid rgba(16, 185, 129, 0.3);
    }
    .logo-container {
      width: 76px;
      height: 76px;
      border-radius: 22px;
      background: #0B132B;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px auto;
      box-shadow: 0 10px 25px rgba(207, 160, 53, 0.3);
      border: 1px solid rgba(207, 160, 53, 0.4);
      padding: 6px;
    }
    .logo-container img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    h1 {
      font-size: 22px;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 4px;
      letter-spacing: -0.5px;
    }
    .sub-brand {
      font-size: 11px;
      font-weight: 700;
      color: #CFA035;
      letter-spacing: 4px;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    p {
      color: #94a3b8;
      font-size: 13px;
      line-height: 1.6;
      margin-bottom: 24px;
    }
    .spinner {
      width: 32px;
      height: 32px;
      border: 3px solid #1e293b;
      border-top-color: #CFA035;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin: 0 auto 20px auto;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    .btn-main {
      display: block;
      width: 100%;
      padding: 14px 20px;
      background: #059669;
      color: #ffffff;
      font-size: 14px;
      font-weight: 700;
      border-radius: 14px;
      text-decoration: none;
      transition: all 0.2s ease;
      box-shadow: 0 4px 14px rgba(5, 150, 105, 0.4);
      margin-bottom: 12px;
      cursor: pointer;
      border: none;
    }
    .btn-main:hover {
      background: #10b981;
      transform: translateY(-1px);
    }
    .btn-popup {
      display: block;
      width: 100%;
      padding: 12px 20px;
      background: #1e293b;
      color: #e2e8f0;
      font-size: 13px;
      font-weight: 600;
      border-radius: 14px;
      text-decoration: none;
      transition: all 0.2s ease;
      border: 1px solid #334155;
      cursor: pointer;
    }
    .btn-popup:hover {
      background: #334155;
      color: #ffffff;
    }
    .note {
      margin-top: 24px;
      padding-top: 18px;
      border-top: 1px solid #1e293b;
      font-size: 11px;
      color: #64748b;
      line-height: 1.5;
    }
    .url-display {
      margin-top: 8px;
      word-break: break-all;
      color: #10b981;
      font-family: monospace;
      font-size: 11px;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo-container">
      <img src="${publicUrl}/tkr-logo.svg" alt="TKR Holdings Logo" onerror="this.src='${publicUrl}/icon.svg'" />
    </div>
    <div class="badge">টিকেআর হোল্ডিংস • অফিসিয়াল ডেস্কটপ লাঞ্চার</div>
    <h1>TKR HOLDINGS</h1>
    <div class="sub-brand">Official Store</div>
    <div class="spinner"></div>
    <p>ল্যাপটপে অফিশিয়াল অ্যাপটি চালু হচ্ছে... সরাসরি ওপেন না হলে নিচের বাটনে ক্লিক করুন:</p>

    <a href="${publicUrl}" class="btn-main" id="launchBtn">
      👉 এখনই স্টোর ওপেন করুন (Open Store)
    </a>

    <button type="button" class="btn-popup" onclick="openAppWindow()">
      🖥️ ব্রাউজার বার ছাড়া ফুলস্ক্রিন উইন্ডোতে খুলুন
    </button>

    <div class="note">
      ✓ এই ফাইলটি আপনার ল্যাপটপ বা কম্পিউটারে ডাবল-ক্লিক করলেই সরাসরি ওয়েবসাইট চালু হবে।<br/>
      ✓ টেলিগ্রাম বা হোয়াটসঅ্যাপে বন্ধুদের সাথেও শেয়ার করতে পারেন।
      <div class="url-display">${publicUrl}</div>
    </div>
  </div>

  <script>
    const storeUrl = "${publicUrl}";

    function openAppWindow() {
      const width = Math.min(1366, window.screen.availWidth || 1280);
      const height = Math.min(860, window.screen.availHeight || 800);
      const left = Math.max(0, (window.screen.availWidth - width) / 2);
      const top = Math.max(0, (window.screen.availHeight - height) / 2);
      const features = 'width=' + width + ',height=' + height + ',left=' + left + ',top=' + top + ',menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes';
      window.open(storeUrl, '_blank', features);
    }

    // Attempt instant navigation directly so the user gets into the store without delay
    setTimeout(function() {
      try {
        window.location.replace(storeUrl);
      } catch(e) {
        window.location.href = storeUrl;
      }
    }, 600);
  </script>
</body>
</html>`;

    const blob = new Blob([appHtmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'TKR-Express-Hub-App.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Generate 1-Click Windows Desktop App Auto-Installer (.bat)
  // This automatically creates a permanent desktop shortcut named "TKR Holdings" on Windows Desktop
  // and launches directly in dedicated standalone app window (no browser address bar, tabs, or bookmarks)
  const downloadWindowsAppInstaller = () => {
    const publicUrl = getPublicStoreUrl();
    const batContent = `@echo off
chcp 65001 >nul
title TKR Holdings - Desktop App Installer
color 1F
cls
echo.
echo ======================================================================
echo              TKR HOLDINGS - OFFICIAL DESKTOP APP SETUP
echo ======================================================================
echo.
echo   [1/3] আপনার কম্পিউটারের ডেস্কটপে আসল অ্যাপ তৈরি করা হচ্ছে...
echo         Creating TKR Holdings App Shortcut on Desktop...
echo.

set "TARGET_URL=${publicUrl}"

:: Create Desktop shortcut using native Windows Script Host (No PowerShell dependency)
echo Set oWS = WScript.CreateObject("WScript.Shell") > "%temp%\\tkr_shortcut.vbs"
echo sLinkFile = oWS.SpecialFolders("Desktop") ^& "\\TKR Holdings.lnk" >> "%temp%\\tkr_shortcut.vbs"
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> "%temp%\\tkr_shortcut.vbs"
echo oLink.TargetPath = "msedge.exe" >> "%temp%\\tkr_shortcut.vbs"
echo oLink.Arguments = "--app=""%TARGET_URL%""" >> "%temp%\\tkr_shortcut.vbs"
echo oLink.Description = "TKR Holdings Official Desktop App" >> "%temp%\\tkr_shortcut.vbs"
echo oLink.WindowStyle = 1 >> "%temp%\\tkr_shortcut.vbs"
echo oLink.Save >> "%temp%\\tkr_shortcut.vbs"

cscript //nologo "%temp%\\tkr_shortcut.vbs" >nul 2>&1
del "%temp%\\tkr_shortcut.vbs" >nul 2>&1

echo   [OK] আপনার ডেস্কটপে "TKR Holdings" অ্যাপ আইকন তৈরি সম্পন্ন!
echo.
echo   [2/3] ব্রাউজার বার ছাড়া ফুলস্ক্রিন অ্যাপ উইন্ডো চালু করা হচ্ছে...
echo         Launching Standalone Window (No Browser Address Bar)...
echo.

start msedge --app="%TARGET_URL%" 2>nul
if %ERRORLEVEL% NEQ 0 (
  start chrome --app="%TARGET_URL%" 2>nul
)
if %ERRORLEVEL% NEQ 0 (
  start "" "%TARGET_URL%"
)

echo.
echo ======================================================================
echo   [সফল!] TKR Holdings অ্যাপ সফলভাবে ইনস্টল ও চালু হয়েছে!
echo.
echo   - আপনার ডেস্কটপে "TKR Holdings" অ্যাপ আইকন তৈরি হয়ে গেছে।
echo   - এখন থেকে কোনো ব্রাউজারে না গিয়ে সরাসরি ডেস্কটপের ওই অ্যাপে
echo     ক্লিক করলেই সম্পূর্ণ আলাদা সফটওয়্যার হিসেবে ওপেন হবে।
echo ======================================================================
echo.
echo   উইন্ডোটি বন্ধ করতে কিবোর্ডের যেকোনো বোতাম (Key) চাপুন...
pause >nul
exit
`;
    const blob = new Blob([batContent], { type: 'application/x-bat;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Install-TKR-Holdings-App.bat';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Generate 100% Silent Windows Standalone App Runner (.vbs)
  // Double-clicking this runs via wscript.exe: ZERO TERMINAL, ZERO COMMAND PROMPT, ZERO BLACK BOX!
  const downloadSilentVbsRunner = () => {
    const publicUrl = getPublicStoreUrl();
    const vbsContent = `' ============================================================
' TKR Holdings - Official Standalone Desktop App
' ZERO Terminal / Zero Command Prompt Launcher
' ============================================================
Option Explicit
On Error Resume Next

Dim WshShell, strDesktop, oLink, targetUrl, launched

Set WshShell = CreateObject("WScript.Shell")
strDesktop = WshShell.SpecialFolders("Desktop")
targetUrl = "${publicUrl}"

' 1. Automatically create permanent Desktop App Shortcut
Set oLink = WshShell.CreateShortcut(strDesktop & "\\TKR Holdings.lnk")
oLink.TargetPath = "msedge.exe"
oLink.Arguments = "--app=""" & targetUrl & """"
oLink.Description = "TKR Holdings Official Desktop App"
oLink.WindowStyle = 1
oLink.Save
Set oLink = Nothing

' 2. Launch directly in Dedicated App Window (NO TERMINAL / NO CMD WINDOW)
launched = False
WshShell.Run "msedge.exe --app=""" & targetUrl & """", 1, False
If Err.Number = 0 Then
  launched = True
Else
  Err.Clear
  WshShell.Run "chrome.exe --app=""" & targetUrl & """", 1, False
  If Err.Number = 0 Then
    launched = True
  Else
    Err.Clear
    WshShell.Run targetUrl, 1, False
  End If
End If

' 3. Show native Windows Success Dialog
MsgBox "TKR Holdings অফিসিয়াল অ্যাপ সফলভাবে চালু হয়েছে!" & vbCrLf & vbCrLf & _
       "✓ আপনার ডেস্কটপে 'TKR Holdings' অ্যাপ আইকন তৈরি করা হয়েছে।" & vbCrLf & _
       "✓ এখন থেকে সরাসরি ডেস্কটপের ওই অ্যাপে ক্লিক করে ব্যবহার করতে পারবেন।", _
       64, "TKR Holdings Official"

Set WshShell = Nothing
`;
    const blob = new Blob([vbsContent], { type: 'text/vbscript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'TKR-Holdings-App.vbs';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Generate Windows .bat standalone app launcher
  // When clicked on Windows, runs Chrome or Edge in standalone --app mode!
  const downloadWindowsBatLauncher = () => {
    downloadWindowsAppInstaller();
  };

  // Generate Windows .url desktop shortcut
  const downloadDesktopShortcut = () => {
    const publicUrl = getPublicStoreUrl();
    const shortcutContent = `[InternetShortcut]
URL=${publicUrl}
IconIndex=0
IconFile=${publicUrl}/favicon.ico
HotKey=0
IDList=
[{000214A0-0000-0000-C000-000000000046}]
Prop3=19,0
`;
    const blob = new Blob([shortcutContent], { type: 'application/x-mswinurl' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'TKR-Express-Hub.url';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Share via Telegram
  const shareToTelegram = () => {
    const publicUrl = getPublicStoreUrl();
    const text = encodeURIComponent('⚡ TKR Express Hub - বাংলাদেশের সেরা গ্যাজেট ও অনলাইন শপিং ওয়েবসাইট! এক ক্লিকে ল্যাপটপ বা মোবাইলে ব্রাউজ করুন ও ক্যাশ অন ডেলিভারিতে অর্ডার করুন:');
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(publicUrl)}&text=${text}`;
    window.open(telegramUrl, '_blank', 'noopener,noreferrer');
  };

  // Share via WhatsApp
  const shareToWhatsApp = () => {
    const publicUrl = getPublicStoreUrl();
    const text = encodeURIComponent(`⚡ TKR Express Hub - বাংলাদেশের সেরা অনলাইন শপিং স্টোর। ক্যাশ অন ডেলিভারিতে অর্ডার করতে ভিজিট করুন: ${publicUrl}`);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${text}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return {
    isInstallable: Boolean(deferredPrompt),
    isInstalled,
    isIOS,
    install,
    downloadPortableAppFile,
    downloadWindowsAppInstaller,
    downloadSilentVbsRunner,
    downloadWindowsBatLauncher,
    downloadDesktopShortcut,
    shareToTelegram,
    shareToWhatsApp,
    getPublicStoreUrl,
  };
}
