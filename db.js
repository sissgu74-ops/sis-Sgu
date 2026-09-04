// ضع رابط المشروع الأساسي فقط بدون /rest/v1/ في النهاية
const SUPABASE_URL = "https://gvgewkiqpwmobecosqdx.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2Z2V3a2lxcHdtb2JlY29zcWR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1Mjg5OTMsImV4cCI6MjEwNDEwNDk5M30.h8AVcuLgoDrOYBd0fA_DO-kUyXDsK5Swl6-MV2S__n8"; 

async function supabaseRequest(endpoint, method = "GET", body = null) {
    // التأكد من أن الرابط يدمج الـ endpoint بشكل صحيح
    const url = `${SUPABASE_URL}/rest/v1/${endpoint}`;
    const response = await fetch(url, {
        method: method,
        headers: {
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json",
            "Prefer": "return=representation"
        },
        body: body ? JSON.stringify(body) : null
    });
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "خطأ في الاتصال بقاعدة البيانات");
    }
    const text = await response.text();
    return text ? JSON.parse(text) : null;
}