/* レビュー用簡易ゲート — 本番公開時は全HTMLからscriptタグとnoindexを削除すること */
(function () {
  var KEY = 'ar_preview_auth';
  var PASS = 'ar-preview0621';

  if (sessionStorage.getItem(KEY) === '1') return;

  var overlay = document.createElement('div');
  overlay.style.cssText = [
    'position:fixed', 'inset:0', 'z-index:99999',
    'background:#050301', 'display:flex', 'align-items:center', 'justify-content:center'
  ].join(';');

  overlay.innerHTML = [
    '<div style="text-align:center;font-family:-apple-system,sans-serif;padding:2rem">',
    '<p style="font-size:14px;color:#9a8878;margin-bottom:1.25rem">このページはレビュー用の限定公開です</p>',
    '<input id="ar-pw" type="password" placeholder="パスワードを入力"',
    ' style="width:220px;padding:10px 14px;border:1px solid #333;border-radius:4px;font-size:15px;outline:none;background:#0d0804;color:#f5ede0">',
    '<br><button id="ar-btn"',
    ' style="margin-top:12px;padding:10px 28px;background:#e85d04;color:#fff;border:none;border-radius:4px;font-size:14px;cursor:pointer;letter-spacing:.06em">',
    '確認</button>',
    '<p id="ar-err" style="color:#e85d04;font-size:13px;margin-top:10px;min-height:18px"></p>',
    '</div>'
  ].join('');

  document.body.insertBefore(overlay, document.body.firstChild);

  function check() {
    if (document.getElementById('ar-pw').value === PASS) {
      sessionStorage.setItem(KEY, '1');
      document.body.removeChild(overlay);
    } else {
      document.getElementById('ar-err').textContent = 'パスワードが違います';
      document.getElementById('ar-pw').value = '';
      document.getElementById('ar-pw').focus();
    }
  }

  document.getElementById('ar-btn').addEventListener('click', check);
  document.getElementById('ar-pw').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') check();
  });
})();
