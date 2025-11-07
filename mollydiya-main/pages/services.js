import Link from 'next/link';

// NOTE: У реальному Next.js-додатку метадані (title, viewport, icon, apple-touch-icon) 
// зазвичай розміщуються у файлі layout.js або pages/_document.js, а не у цьому компоненті.
// Ми їх тут не відображаємо, щоб не захаращувати код.


// =========================================================================
// 1. КОМПОНЕНТИ ІКОНОК
// =========================================================================

// Компонент для іконки пошуку
const SearchIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

// Складна іконка для Військових облігацій / Армії дронів
const BondIcon = () => (
    <svg width="40" height="68" viewBox="0 0 40 68" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white">
        <path d="M17.931 64.848C14.4828 62.2187 11.9397 58.2963 11.1207 53.7273H0V5.667C5.9914 8.6411 10.2586 15.236 10.7759 22.0463L12.4569 35.5377L11.6379 35.4084C9.8276 35.4084 8.2759 37.0894 8.2759 38.7704C8.2759 40.3222 9.4828 41.6584 11.0345 42.0032L13.0603 42.4773C16.4224 36.1411 18.319 29.9342 18.319 23.8135C18.319 18.2963 17.5862 12.8222 17.5 7.2187C17.5 4.7187 18.4483 2.4342 20 0.667C21.5517 2.4773 22.5 4.7187 22.5 7.2187C22.5 12.8222 21.681 18.3394 21.681 23.8135C21.681 29.8911 23.5776 36.1411 26.9397 42.4773L28.9655 42.0032C30.5172 41.6584 31.7241 40.3222 31.7241 38.7704C31.7241 37.0894 30.1724 35.4084 28.3621 35.4084L27.5431 35.5377L29.2241 22.0463C30.0431 15.236 34.0086 8.6411 40 5.667V53.7273H28.8793C28.0603 58.2532 25.6465 62.348 22.069 64.848C21.25 65.4515 20.5172 66.1842 20.0431 67.1325C19.4828 66.1411 18.75 65.4515 17.931 64.848ZM5.2586 37.1325C5.7328 35.3222 7.069 33.7704 8.7069 32.8222L7.3707 21.7015C6.8966 18.2532 5.4741 15.1498 3.319 12.6066V37.0894H5.2586V37.1325ZM10.9052 50.3653C10.9052 48.6842 11.1638 47.1325 11.5086 45.5808L9.9569 45.236C7.6724 44.5032 5.9052 42.736 5.3017 40.4515H3.4052V50.3653H10.9052ZM18.2759 50.3653C18.2759 48.3394 16.7241 46.5291 14.6983 46.3135C14.3535 47.6066 14.0948 48.9429 14.0948 50.3653H18.2759ZM18.2759 53.7273H14.569C15.1724 56.3566 16.4655 58.7273 18.2759 60.7963V53.7273ZM23.5345 43.3394C22.1121 40.7101 20.7759 37.9515 19.9569 35.1066C19.1379 37.9946 17.8017 40.7101 16.3793 43.3394C17.8017 43.6842 19.0086 44.6325 19.9569 45.7101C20.9052 44.6325 22.1121 43.6842 23.5345 43.3394ZM25.819 50.3653C25.819 48.9429 25.5603 47.6066 25.2155 46.3135C23.1897 46.5722 21.6379 48.3394 21.6379 50.3653H25.819ZM25.3448 53.7273H21.6379V60.7963C23.4483 58.7273 24.7414 56.3566 25.3448 53.7273ZM36.5948 50.3653V40.4515H34.6983C34.0948 42.736 32.3276 44.5032 30.0431 45.236L28.4914 45.5808C28.8362 47.1325 29.0948 48.6842 29.0948 50.3653H36.5948ZM36.5948 37.1325V12.6498C34.4397 15.1498 32.8879 18.2532 32.5431 21.7446L31.2069 32.8653C32.8879 33.8135 34.181 35.3653 34.6552 37.1756H36.5948V37.1325Z" fill="white" />
    </svg>
);


// =========================================================================
// 2. ДАНІ СЕРВІСІВ ДЛЯ МЕППІНГУ
// =========================================================================

const services = [
  { title: 'Допомога армії', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell w-5 h-5 text-white"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg> },
  { title: 'Зимова єПідтримка', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cloud-sun w-5 h-5 text-white"><path d="M12 2v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="M20 12h2" /><path d="m19.07 4.93-1.41 1.41" /><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" /><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" /></svg> },
  { title: 'Незламність', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap w-5 h-5 text-white"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></svg> },
  { title: 'Військові облігації', icon: <BondIcon /> },
  // Використання <br/> або <></> для багаторядкового тексту
  { title: <>Вступити в<br/>Армію дронів</>, icon: <BondIcon /> },
  { title: <>Національний<br/>кешбек</>, icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open w-5 h-5 text-white"><path d="M12 7v14" /><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" /></svg> },
  { title: 'єВідновлення', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wrench w-5 h-5 text-white"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg> },
  { title: <>Ветеранський<br/>спорт</>, icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dumbbell w-5 h-5 text-white"><path d="M14.4 14.4 9.6 9.6" /><path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" /><path d="m21.5 21.5-1.4-1.4" /><path d="M3.9 3.9 2.5 2.5" /><path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z" /></svg> },
  { title: 'Транспорт', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-car w-5 h-5 text-white"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" /></svg> },
  { title: 'Місце проживання', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house w-5 h-5 text-white"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg> },
  { title: 'Опитування', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard w-5 h-5 text-white"><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /></svg> },
  { title: 'Шлюб онлайн', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart w-5 h-5 text-white"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg> },
  { title: 'Послуги для ВПО', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users w-5 h-5 text-white"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg> },
  { title: 'Податки', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text w-5 h-5 text-white"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /></svg> },
  { title: <>Допомога по<br/>безробіттю</>, icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hand-helping w-5 h-5 text-white"><path d="M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14" /><path d="m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" /><path d="m2 13 6 6" /></svg> },
];

// =========================================================================
// 3. ОСНОВНИЙ КОМПОНЕНТ
// =========================================================================

export default function ServicesPage() {
  return (
    <>
      <main className="min-h-[100dvh] max-h-[100dvh] bg-gradient-to-b from-[#7AC7C0] via-[#B8D7EA] to-[#C5B6E0] pb-[120px] pt-14 overflow-y-auto">
        <div className="px-5 flex flex-col gap-6">
          <h1 className="text-[32px] font-bold">Сервіси</h1>
          
          {/* Search Bar */}
          <div className="relative">
            <SearchIcon className="lucide lucide-search absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Пошук" 
              className="w-full h-[52px] pl-12 pr-4 rounded-2xl bg-white/90 text-[17px] placeholder:text-gray-400 focus:outline-none" 
            />
          </div>
          
          {/* Services Grid */}
          <div className="grid grid-cols-2 gap-4">
            {services.map((service, index) => (
              <button 
                key={index}
                className="aspect-[4/3] bg-white/40 backdrop-blur-[2px] rounded-2xl p-5 flex flex-col items-start"
              >
                <div className="bg-black rounded-full p-2.5 mb-auto">
                  {service.icon}
                </div>
                <span className="text-[17px] font-medium leading-tight">
                  {service.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Navigation Bar (Footer) */}
      <nav className="fixed bottom-0 left-0 right-0">
        <div className="flex justify-around items-center bg-black text-white h-[80px] pb-[20px] text-[10px]">
          <Link className="flex flex-col items-center gap-1 w-1/4" href="/mollydiya/home">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-align-left text-white"><path d="M15 12H3" /><path d="M17 18H3" /><path d="M21 6H3" /></svg>
            <span>Стрічка</span>
          </Link>
          <Link className="flex flex-col items-center gap-1 w-1/4" href="/mollydiya/documents">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text text-white"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /></svg>
            <span>Документи</span>
          </Link>
          <Link className="flex flex-col items-center gap-1 w-1/4" href="/mollydiya/services">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap text-white"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></svg>
            <span>Сервіси</span>
          </Link>
          <Link className="flex flex-col items-center gap-1 w-1/4" href="/mollydiya/menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user text-white"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            <span>Меню</span>
          </Link>
        </div>
      </nav>
    </>
  );
}