// G-Link - Shared application logic

// Storage key for demo data
const STORAGE_KEY = 'glink_demo_data';

// Get or create demo storage
function getStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : { goldLinks: [], registries: [] };
  } catch {
    return { goldLinks: [], registries: [] };
  }
}

function setStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Gold Link Modal
function openGoldLinkModal() {
  const step1 = document.getElementById('goldLinkStep1');
  const step2 = document.getElementById('goldLinkStep2');
  if (step1) step1.style.display = 'block';
  if (step2) step2.style.display = 'none';
  document.getElementById('goldLinkModal')?.classList.add('active');
}

function closeGoldLinkModal() {
  document.getElementById('goldLinkModal')?.classList.remove('active');
}

document.querySelectorAll('#createGoldLinkBtn, #heroGoldLink').forEach(btn => {
  btn?.addEventListener('click', (e) => {
    e.preventDefault();
    openGoldLinkModal();
  });
});

document.getElementById('closeGoldLink')?.addEventListener('click', closeGoldLinkModal);

document.getElementById('goldLinkModal')?.addEventListener('click', (e) => {
  if (e.target.id === 'goldLinkModal') closeGoldLinkModal();
});

// Get claim URL for a gold link id
function getClaimUrl(id) {
  const base = window.location.origin + window.location.pathname.replace(/[^/]*$/, '');
  return base + 'claim.html?id=' + id;
}

// Show share modal with link
function showShareModal(id, senderName, amount) {
  const claimUrl = getClaimUrl(id);
  const message = `You've been blessed with ₹${amount.toLocaleString()} worth of gold from ${senderName}! Claim it here: ${claimUrl}`;
  
  document.getElementById('shareLinkDisplay').textContent = claimUrl;
  document.getElementById('shareWhatsAppBtn').href = 'https://wa.me/?text=' + encodeURIComponent(message);
  document.getElementById('shareEmailBtn').href = 'mailto:?subject=' + encodeURIComponent('You\'ve been blessed with gold!') + '&body=' + encodeURIComponent(message);
  document.getElementById('previewAsRecipient').href = 'claim.html?id=' + id;
  
  document.getElementById('copyLinkBtn').onclick = () => {
    navigator.clipboard.writeText(claimUrl);
    document.getElementById('copyLinkBtn').textContent = 'Copied!';
    setTimeout(() => { document.getElementById('copyLinkBtn').textContent = 'Copy Link'; }, 2000);
  };
  
  document.getElementById('goldLinkModal').classList.remove('active');
  document.getElementById('shareLinkModal').classList.add('active');
}

document.getElementById('closeShareModal')?.addEventListener('click', () => {
  document.getElementById('shareLinkModal').classList.remove('active');
});

document.getElementById('shareLinkModal')?.addEventListener('click', (e) => {
  if (e.target.id === 'shareLinkModal') document.getElementById('shareLinkModal').classList.remove('active');
});

// Payment step - show/hide based on method
function initPaymentMethodToggle() {
  const methods = document.querySelectorAll('input[name="paymentMethod"]');
  const upiDiv = document.getElementById('upiInput');
  const cardDiv = document.getElementById('cardInput');
  const paypalDiv = document.getElementById('paypalInput');
  if (!methods.length) return;
  function toggle() {
    const v = document.querySelector('input[name="paymentMethod"]:checked')?.value;
    if (upiDiv) upiDiv.style.display = v === 'upi' ? 'block' : 'none';
    if (cardDiv) cardDiv.style.display = v === 'card' ? 'block' : 'none';
    if (paypalDiv) paypalDiv.style.display = v === 'paypal' ? 'block' : 'none';
  }
  methods.forEach(m => m.addEventListener('change', toggle));
}

// Gold Link: Step 1 submit -> show payment step
document.getElementById('goldLinkForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const amount = getGoldLinkAmount();
  const fee = Math.round(amount * 0.02);
  const total = amount + fee;
  
  document.getElementById('payGoldAmount').textContent = '₹' + amount.toLocaleString();
  document.getElementById('payFee').textContent = '₹' + fee;
  document.getElementById('payTotal').textContent = '₹' + total.toLocaleString();
  
  document.getElementById('goldLinkStep1').style.display = 'none';
  document.getElementById('goldLinkStep2').style.display = 'block';
  initPaymentMethodToggle();
});

function getGoldLinkAmount() {
  const amountEl = document.getElementById('amount');
  return amountEl.value === 'custom' 
    ? parseInt(document.getElementById('customAmount').value) || 500
    : parseInt(amountEl.value);
}

// Back to details
document.getElementById('backToDetails')?.addEventListener('click', () => {
  document.getElementById('goldLinkStep2').style.display = 'none';
  document.getElementById('goldLinkStep1').style.display = 'block';
});

// Pay & Create Link
document.getElementById('payNowBtn')?.addEventListener('click', () => {
  const amount = getGoldLinkAmount();
  const senderName = document.getElementById('senderName').value;
  const message = document.getElementById('message').value;
  const theme = document.getElementById('theme').value;
  
  const id = 'bless-' + Math.random().toString(36).slice(2, 9);
  const data = getStorage();
  data.goldLinks.push({
    id,
    amount,
    senderName,
    message,
    theme,
    claimed: false,
    createdAt: new Date().toISOString()
  });
  setStorage(data);
  
  document.getElementById('goldLinkStep2').style.display = 'none';
  document.getElementById('goldLinkStep1').style.display = 'block';
  document.getElementById('goldLinkModal').classList.remove('active');
  showShareModal(id, senderName, amount);
  window.dispatchEvent(new CustomEvent('glink:linkCreated'));
});

// Create Wedding Registry
document.querySelectorAll('#createRegistryBtn, #heroRegistry').forEach(btn => {
  btn?.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'wedding-registry.html';
  });
});
