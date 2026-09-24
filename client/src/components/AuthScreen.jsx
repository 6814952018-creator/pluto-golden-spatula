export default function AuthScreen({ authMode, authForm, authError, onSubmit, onChange, onToggleMode }) {
  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-[#0b0d14] p-5 text-[#dce0e9]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#3e3048_0,transparent_35%),radial-gradient(circle_at_80%_80%,#143b43_0,transparent_32%)]" />
      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-[#41485b] bg-[#171a25] shadow-2xl lg:grid-cols-[1.05fr_.95fr]">
        <div className="hidden min-h-[570px] flex-col justify-between bg-[#252033] p-10 lg:flex">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.28em] text-[#f4bd55]">GOLDEN SPATULA / SET 18</p>
            <h2 className="mt-12 max-w-sm font-display text-6xl font-semibold leading-[.92] text-white">อ่านเกม<br /><span className="text-[#f4bd55]">ให้ขาด</span></h2>
            <p className="mt-6 max-w-sm text-sm leading-7 text-[#aeb4c2]">คู่มือและเครื่องมือสำหรับวางแผนทีม วิเคราะห์กระดาน และไต่แรงก์ให้มั่นคง</p>
          </div>
          <div className="grid grid-cols-3 gap-3"><div className="h-20 rounded-xl border border-[#5b506e] bg-[#322944]" /><div className="h-20 rounded-xl border border-[#5b506e] bg-[#41344c]" /><div className="h-20 rounded-xl border border-[#5b506e] bg-[#263d45]" /></div>
        </div>
        <form onSubmit={onSubmit} className="p-7 sm:p-10">
          <div className="flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#f4bd55] font-display text-lg font-bold text-[#28231a]">18</span><span className="text-xs font-bold uppercase tracking-[.2em] text-[#717a90]">Player access</span></div>
          <h1 className="mt-10 font-display text-4xl font-semibold text-white">{authMode === 'login' ? 'กลับเข้าสู่สนาม' : 'สร้างบัญชีผู้เล่น'}</h1>
          <p className="mt-3 text-sm leading-6 text-[#8e96a9]">{authMode === 'login' ? 'เข้าสู่ระบบด้วยชื่อผู้ใช้เพื่อบันทึกทีมและใช้เครื่องมือวิเคราะห์' : 'สมัครเพื่อเริ่มสร้างทีมและติดตามบทเรียนของคุณ'}</p>
          {authMode === 'login' && <div className="mt-6 rounded-lg border border-[#3d4b5d] bg-[#172b34] px-4 py-3 text-xs leading-5 text-[#8fd7c0]">บัญชีทดลอง Admin: <strong>admin</strong> / <strong>Admin123!</strong></div>}
          <input required minLength="3" value={authForm.username} onChange={(event) => onChange('username', event.target.value)} placeholder="ชื่อผู้ใช้" className="mt-7 w-full rounded-lg border border-[#454d61] bg-[#11141e] px-4 py-3 text-sm text-white outline-none transition focus:border-[#f4bd55]" />
          {authMode === 'register' && <input required type="email" value={authForm.email} onChange={(event) => onChange('email', event.target.value)} placeholder="อีเมล" className="mt-3 w-full rounded-lg border border-[#454d61] bg-[#11141e] px-4 py-3 text-sm text-white outline-none transition focus:border-[#f4bd55]" />}
          <input required minLength="6" type="password" value={authForm.password} onChange={(event) => onChange('password', event.target.value)} placeholder="รหัสผ่านอย่างน้อย 6 ตัวอักษร" className="mt-3 w-full rounded-lg border border-[#454d61] bg-[#11141e] px-4 py-3 text-sm text-white outline-none transition focus:border-[#f4bd55]" />
          {authError && <p className="mt-3 rounded-lg border border-[#713f4a] bg-[#331f2a] px-3 py-2 text-sm text-[#f78b7d]">{authError}</p>}
          <button className="mt-6 w-full rounded-lg bg-[#f4bd55] px-4 py-3 font-bold text-[#28231a] shadow-[3px_3px_0_#885f31] transition hover:translate-y-0.5">{authMode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}</button>
          <button type="button" onClick={onToggleMode} className="mt-5 w-full text-sm text-[#f4bd55] hover:text-white">{authMode === 'login' ? 'ยังไม่มีบัญชี? สมัครสมาชิก' : 'มีบัญชีแล้ว? เข้าสู่ระบบ'}</button>
        </form>
      </div>
    </div>
  );
}
