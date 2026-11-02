// 이 파일은 누구나 볼 수 있습니다. 공개되어도 되는 값만 넣으세요.
const SUPABASE_URL = 'https://xpphuqtpxqoqrgbpkeac.supabase.co'
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_tJoQpwezEY8yCOzDz6qugw_Ty5KPBeQ'
const TOSS_CLIENT_KEY = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm' // 토스 공식 문서의 테스트 키

const db = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)
