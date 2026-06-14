// 工具数据
const TOOLS = [
  { id: 'image-compress', icon: '🖼️', name: '图片压缩', desc: '在线压缩PNG/JPG图片，保持清晰度', cat: 'media', color: '#3b82f6' },
  { id: 'qrcode', icon: '📱', name: '二维码生成', desc: '生成二维码，支持文本/链接等格式', cat: 'media', color: '#10b981' },
  { id: 'json-format', icon: '{}', name: 'JSON格式化', desc: '格式化/压缩JSON数据，支持校验', cat: 'dev', color: '#f59e0b' },
  { id: 'password-gen', icon: '🔒', name: '密码生成器', desc: '生成高强度随机密码', cat: 'security', color: '#8b5cf6' },
  { id: 'timestamp', icon: '⏰', name: '时间戳转换', desc: 'Unix时间戳与日期互转', cat: 'dev', color: '#ec4899' },
  { id: 'unit-convert', icon: '📏', name: '单位换算', desc: '长度/重量/温度等常用单位换算', cat: 'utils', color: '#14b8a6' },
  { id: 'word-count', icon: '📝', name: '字数统计', desc: '统计字数、字符数、段落数', cat: 'utils', color: '#f97316' },
  { id: 'color-picker', icon: '🎨', name: '颜色选择器', desc: '选色、取色、颜色格式互转', cat: 'design', color: '#ef4444' },
  { id: 'regex-tester', icon: '🔍', name: '正则测试', desc: '在线测试正则表达式匹配结果', cat: 'dev', color: '#06b6d4' },
  { id: 'base64', icon: '🔐', name: 'Base64编解码', desc: 'Base64编码与解码', cat: 'dev', color: '#6366f1' },
  { id: 'markdown', icon: '📄', name: 'Markdown预览', desc: '实时预览Markdown渲染效果', cat: 'dev', color: '#84cc16' },
  { id: 'text-diff', icon: '↔️', name: '文本对比', desc: '对比两段文本的差异', cat: 'utils', color: '#a855f7' },
  { id: 'url-encode', icon: '🌐', name: 'URL编解码', desc: 'URL编码/解码', cat: 'dev', color: '#0ea5e9' },
  { id: 'case-convert', icon: 'Aa', name: '大小写转换', desc: '文本大小写、驼峰、蛇形互转', cat: 'utils', color: '#22c55e' },
  { id: 'hash-gen', icon: '#️⃣', name: 'Hash加密', desc: 'MD5/SHA1/SHA256/SHA512 哈希生成', cat: 'security', color: '#e11d48' },
];

const CATEGORIES = [
  { id: 'all', name: '全部' },
  { id: 'dev', name: '开发' },
  { id: 'utils', name: '实用工具' },
  { id: 'media', name: '图片/媒体' },
  { id: 'security', name: '安全' },
  { id: 'design', name: '设计' },
];

let currentCat = 'all';
let searchTerm = '';

// 渲染工具卡片
function renderTools() {
  const grid = document.getElementById('toolsGrid');
  if (!grid) return;
  
  const filtered = TOOLS.filter(t => {
    const matchCat = currentCat === 'all' || t.cat === currentCat;
    const matchSearch = !searchTerm || t.name.includes(searchTerm) || t.desc.includes(searchTerm);
    return matchCat && matchSearch;
  });
  
  if (filtered.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:48px 0;color:var(--gray-400)">没有找到匹配的工具</div>';
    return;
  }
  
  grid.innerHTML = filtered.map(t => `
    <a href="tools/${t.id}.html" class="tool-card" style="text-decoration:none;color:inherit">
      <div class="icon" style="background:${t.color}15;color:${t.color}">${t.icon}</div>
      <div class="name">${t.name}</div>
      <div class="desc">${t.desc}</div>
      <span class="badge-free">免费</span>
    </a>
  `).join('');
}

// 渲染分类标签
function renderCategories() {
  const container = document.getElementById('categoryTabs');
  if (!container) return;
  container.innerHTML = CATEGORIES.map(c => `
    <span class="category-tab ${c.id === currentCat ? 'active' : ''}" data-cat="${c.id}">${c.name}</span>
  `).join('');
  
  container.querySelectorAll('.category-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCat = tab.dataset.cat;
      renderTools();
    });
  });
}

// 工具搜索
function initSearch() {
  const input = document.getElementById('searchInput');
  if (!input) return;
  input.addEventListener('input', () => {
    searchTerm = input.value.trim();
    renderTools();
  });
}

// 复制到剪贴板
function copyText(text) {
  if (!text) return;
  const toast = document.getElementById('copyToast');
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('已复制到剪贴板');
    }).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.left = '-9999px';
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  showToast('已复制到剪贴板');
}

function showToast(msg) {
  const toast = document.getElementById('copyToast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2000);
}

// 页面初始化
document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderTools();
  initSearch();
});
