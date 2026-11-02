// 모든 페이지에서 쓰는 공통 코드입니다.

async function getSession() {
  const { data: { session } } = await db.auth.getSession()
  return session
}

async function isAdmin(session) {
  const { data } = await db.from('admins').select('user_id').eq('user_id', session.user.id).maybeSingle()
  return !!data
}

// 로그인하지 않았으면 로그인 페이지로 보냅니다.
async function requireLogin() {
  const session = await getSession()
  if (!session) {
    const page = location.pathname.split('/').pop() + location.search
    location.href = `login.html?next=${encodeURIComponent(page)}`
  }
  return session
}

function won(amount) {
  return `${amount.toLocaleString('ko-KR')}원`
}

// 결제 내역 한 건을 카드로 만듭니다.
function orderCard(order, showBuyer) {
  const card = document.createElement('article')
  card.className = 'order-card'

  const name = document.createElement('strong')
  name.textContent = order.product_name
  const amount = document.createElement('span')
  amount.className = 'order-amount'
  amount.textContent = won(order.amount)
  const date = document.createElement('span')
  date.className = 'muted'
  date.textContent = new Date(order.paid_at).toLocaleString('ko-KR')
  card.append(name, amount, date)

  if (showBuyer) {
    const buyer = document.createElement('span')
    buyer.className = 'muted order-buyer'
    buyer.textContent = order.user_email
    card.append(buyer)
  }
  return card
}

async function renderHeader() {
  const header = document.getElementById('site-header')
  if (!header) return

  const link = (href, text) => {
    const a = document.createElement('a')
    a.href = href
    a.textContent = text
    return a
  }

  const brand = link('index.html', '굿즈 샵')
  brand.className = 'brand'
  const nav = document.createElement('nav')
  nav.append(link('index.html', '상품'))

  const session = await getSession()
  if (session) {
    nav.append(link('orders.html', '내 결제 내역'))
    if (await isAdmin(session)) nav.append(link('admin.html', '관리자'))
    const logout = document.createElement('button')
    logout.className = 'nav-button'
    logout.textContent = '로그아웃'
    logout.onclick = async () => {
      await db.auth.signOut()
      location.href = 'index.html'
    }
    nav.append(logout)
  } else {
    nav.append(link('login.html', '로그인'))
  }
  header.replaceChildren(brand, nav)
}

document.addEventListener('DOMContentLoaded', renderHeader)
