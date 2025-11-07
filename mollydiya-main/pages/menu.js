import React, { useState, useEffect, forwardRef, Fragment } from 'react';
import Link from 'next/link';
import Head from 'next/head'; 
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog" 
// (імітація Dialog, з r(1080) та r(2869) в page-a46378a5fd852e24.js)

// ----------------------------------------------------------------------
// ЗОВНІШНІ ЗАЛЕЖНОСТІ (СИМУЛЯЦІЯ)
// ----------------------------------------------------------------------

// Припускаємо, що це twMerge (з r(4508) -> l.cn)
const cn = (...args) => args.filter(Boolean).join(' ');

/** Отримує дані користувача (із r(6823) -> f.is) */
const getUserData = async () => {
  // Симулюємо отримання даних
  return { 
    key: "valid_key", 
    deviceNumber: "DEV-12345678", 
    taxCardNumber: "TAX-901234567", 
    passportNumber: "PAS-78901234",
    name: "Михайло Валерійович Касьян",
    birthDate: "11.08.2007",
    imageBase64: "/default-avatar.png", 
    signature: "M 10 15 C 20 25, 40 5, 40 15 C 60 25, 80 5, 90 15",
  }; 
}; 

/** Зберігає дані користувача (із r(6823) -> f.gt) */
const saveUserData = async (name, birthDate, imageBase64, deviceNumber, signature, taxCardNumber, passportNumber, key) => {
  console.log("Saving user data with key:", key);
  return true;
}; 

/** Валідує ключ (із r(5187) -> h.q) */
const validateKey = (key) => key === "valid_key"; 

// ----------------------------------------------------------------------
// 1. БАЗОВІ КОМПОНЕНТИ (Input, Label, Button)
// ----------------------------------------------------------------------

// Input (із page-a46378a5fd852e24.js)
const Input = forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

// Label (із page-a46378a5fd852e24.js)
const Label = forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
));
Label.displayName = "Label";


// Button (із page-a46378a5fd852e24.js)
const buttonVariants = (variant, size) => cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    variant === "default" && "bg-primary text-primary-foreground hover:bg-primary/90",
    variant === "destructive" && "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    variant === "outline" && "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    variant === "secondary" && "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    variant === "ghost" && "hover:bg-accent hover:text-accent-foreground",
    variant === "link" && "text-primary underline-offset-4 hover:underline",
    size === "default" && "h-10 px-4 py-2",
    size === "sm" && "h-9 rounded-md px-3",
    size === "lg" && "h-11 rounded-md px-8",
    size === "icon" && "h-10 w-10"
);

const Button = forwardRef(({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
  const Comp = asChild ? Fragment : "button"; // Використовуємо Fragment як симуляцію Slot
  return (
    <Comp
      className={cn(buttonVariants(variant, size), className)}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

// ----------------------------------------------------------------------
// 2. ІКОНКИ (INLINE SVG) - БЕЗ LUCIDE-REACT
// ----------------------------------------------------------------------

const IconMail = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>);
const IconKeyRound = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 18v3c0 .6.4 1 1 1h4"/><path d="M15 2l3.5 3.5M20.5 8.5l-2.7-2.7c-.7-.7-1.7-1.1-2.7-1.1H13V3c0-.6-.4-1-1-1l-3 3.5c-1.3 1.3-3 2.1-4.7 2.1H3c-.6 0-1 .4-1 1v4c0 1.7.7 3.4 2.1 4.7l3.5 3.5c.6.6 1.4 1 2.3 1h6.2c1.4 0 2.5-1.1 2.5-2.5v-2.7c0-1-.4-2-1.1-2.7L15 2z"/></svg>);
const IconHistory = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-3.3 5.7l-.4 1.2M12 3v9M7 11h5M20.9 12h-8.9" /></svg>);
const IconSettings = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.11a2 2 0 0 1-1.44 1.83l-.75.32a2 2 0 0 0-1.22 2.76l.13.43a2 2 0 0 1-.78 2.05L4.1 13.9a2 2 0 0 0-.25 2.87l.13.26a2 2 0 0 1 0 2.47l-.13.26a2 2 0 0 0 .25 2.87l2.8-.75a2 2 0 0 1 2.05-.78l.43.13a2 2 0 0 0 2.76-1.22l.32-.75a2 2 0 0 1 1.83-1.44H12c1.1 0 2.2.4 3 1l.75.32a2 2 0 0 0 2.76-1.22l.13-.43a2 2 0 0 1-.78-2.05l-1.57-1.93a2 2 0 0 0-.25-2.87l.13-.26a2 2 0 0 1 0-2.47l-.13-.26a2 2 0 0 0-.25-2.87l-2.8.75a2 2 0 0 1-2.05.78l-.43-.13a2 2 0 0 0-2.76 1.22l-.32.75a2 2 0 0 1-1.44 1.83V4a2 2 0 0 0-2-2Z"/><circle cx="12" cy="12" r="3"/></svg>);
const IconRefreshCw = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 2v6h6M21 22v-6h-6M20.5 11.5A9 9 0 0 0 12 3V2M3.5 12.5a9 9 0 0 0 9 9v1M22 12A10 10 0 0 0 12 2M2 12a10 10 0 0 1 10 10"/></svg>);

// Іконки для BottomNavigation (із documents.js та documents (2).js)
const IconFileText = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /></svg>);
const IconZap = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></svg>);
const IconUser = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>);


// ----------------------------------------------------------------------
// 3. КОМПОНЕНТ МОДАЛЬНОГО ВІКНА (Імітація з page-a46378a5fd852e24.js)
// ----------------------------------------------------------------------

const UpdateModal = ({ isOpen, onClose, children, title, description, actions }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 transition-all duration-300">
      <div 
        className="relative w-full max-w-lg rounded-lg border bg-card text-card-foreground shadow-lg transition-all duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-xl font-semibold leading-none tracking-tight">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="p-6 pt-0">
          {children}
        </div>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6 pt-0 border-t border-border/50">
          {actions}
          <Button variant="secondary" onClick={onClose} className="mt-2 sm:mt-0">
            Скасувати
          </Button>
        </div>
      </div>
    </div>
  );
};


// ----------------------------------------------------------------------
// 4. КОМПОНЕНТ НИЖНЬОЇ НАВІГАЦІЇ (BottomNavigation)
// ----------------------------------------------------------------------

const BottomNavigation = () => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-100 h-20">
            <div className="flex justify-around items-center h-full max-w-lg mx-auto px-4">
                {/* Документи */}
                <Link href="/documents" className="flex flex-col items-center gap-1 opacity-60">
                    <IconFileText className="w-6 h-6" />
                    <span className="text-xs">Документи</span>
                </Link>

                {/* Сервіси */}
                <Link href="/services" className="flex flex-col items-center gap-1 opacity-60">
                    <IconZap className="w-6 h-6" />
                    <span className="text-xs">Сервіси</span>
                </Link>

                {/* Меню (Активний елемент) */}
                <Link href="/menu" className="flex flex-col items-center gap-1">
                    <IconUser className="w-6 h-6 text-[#1E3A8A]" />
                    <span className="text-xs font-semibold text-[#1E3A8A]">Меню</span>
                </Link>

                {/* Штрих-код (Імітація) */}
                <div className="flex flex-col items-center gap-1 opacity-60">
                    <div className="w-10 h-10 bg-[#3B82F6] rounded-xl flex items-center justify-center text-white">
                        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                            <path d="M4 5h16M4 9h16M4 13h16M4 19h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                        </svg>
                    </div>
                    <span className="text-xs mt-2">Штрих-код</span>
                </div>
            </div>
        </nav>
    );
};


// ----------------------------------------------------------------------
// 5. ОСНОВНИЙ КОМПОНЕНТ СТОРІНКИ (MenuPage)
// ----------------------------------------------------------------------

export default function MenuPage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [isKeyValid, setIsKeyValid] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getUserData();
      if (data && validateKey(data.key)) {
        setUserData(data);
        setError("");
      } else {
        throw new Error("Invalid key or user data missing.");
      }
    } catch (e) {
      console.error(e);
      setError("Не вдалося завантажити дані. Спробуйте оновити ключ.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = async () => {
    if (!newKey || !validateKey(newKey)) {
      setIsKeyValid(false);
      return;
    }
    
    // Імітація оновлення даних з новим ключем
    if (userData) {
        try {
            await saveUserData(
                userData.name,
                userData.birthDate,
                userData.imageBase64,
                userData.deviceNumber,
                userData.signature,
                userData.taxCardNumber,
                userData.passportNumber,
                newKey // Передаємо новий ключ
            );
            
            // Після успішного збереження, оновлюємо дані
            await fetchData(); 
            setIsUpdateModalOpen(false);
            setNewKey("");
            setIsKeyValid(true);
            alert("Ключ успішно оновлено та дані завантажено.");
            
        } catch (e) {
            setError("Помилка при збереженні даних.");
        }
    }
  };

  const menuItems = [
    { title: "Пошта", description: "mail@d-app.com.ua", icon: IconMail, href: "#", disabled: true },
    { title: "Ключ (Сесія)", description: userData?.key || "Недоступно", icon: IconKeyRound, onClick: () => setIsUpdateModalOpen(true) },
    { title: "Історія активності", description: "Переглянути всі дії", icon: IconHistory, href: "#", disabled: true },
    { title: "Налаштування", description: "Особисті налаштування", icon: IconSettings, href: "#", disabled: true },
  ];

  return (
    <>
      <Head>
        <title>Меню | Дія</title>
        <meta name="theme-color" content="#ffffff" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon.png" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </Head>

      <main className="min-h-[100dvh] max-h-[100dvh] bg-gradient-to-b from-[#7AC7C0] via-[#B8D7EA] to-[#C5B6E0] pb-[120px] pt-14 overflow-y-auto">
        <div className="max-w-md mx-auto p-4 space-y-6">
          
          {/* Header/User Info */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-white border-2 border-white shadow-md flex items-center justify-center overflow-hidden">
                {/* Симуляція аватара */}
                {userData?.imageBase64 ? (
                    <img src={userData.imageBase64} alt="Аватар користувача" className="w-full h-full object-cover" />
                ) : (
                    <IconUser className="w-8 h-8 text-gray-500" />
                )}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {userData?.name || "Користувач"}
              </h1>
              <p className="text-sm text-gray-600">
                {userData?.birthDate ? `Дата народження: ${userData.birthDate}` : "Особисті дані"}
              </p>
            </div>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}

          {/* Menu Items List */}
          <div className="bg-white rounded-xl shadow-lg divide-y divide-gray-100">
            {menuItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                size="lg"
                className={cn("w-full h-auto justify-start py-4 px-5 text-gray-700 hover:bg-gray-50", item.disabled && "opacity-60 cursor-not-allowed")}
                onClick={item.onClick}
                disabled={item.disabled}
                asChild={!!item.href}
              >
                {item.href ? (
                    <Link href={item.href} className="flex items-center w-full">
                        {item.icon && <item.icon className="w-6 h-6 mr-4 text-[#1E3A8A]" />}
                        <div className="flex-1 text-left">
                            <p className="font-semibold text-base">{item.title}</p>
                            <p className="text-xs text-gray-500">{item.description}</p>
                        </div>
                    </Link>
                ) : (
                    <div className="flex items-center w-full">
                        {item.icon && <item.icon className="w-6 h-6 mr-4 text-[#1E3A8A]" />}
                        <div className="flex-1 text-left">
                            <p className="font-semibold text-base">{item.title}</p>
                            <p className="text-xs text-gray-500">{item.description}</p>
                        </div>
                    </div>
                )}
              </Button>
            ))}
          </div>

          {/* Refresh Button */}
          <Button 
            variant="secondary" 
            size="lg" 
            className="w-full text-gray-700" 
            onClick={fetchData}
            disabled={loading}
          >
            {loading ? "Оновлення..." : "Оновити дані"}
            <IconRefreshCw className="ml-2 w-4 h-4" />
          </Button>

        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />

      {/* Update Key Modal */}
      <UpdateModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setIsKeyValid(true);
        }}
        title="Оновлення Ключа (Сесії)"
        description="Введіть новий ключ для оновлення сесійних даних."
        actions={[
          <Button key="update" onClick={handleUpdate} disabled={loading || !newKey} className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white">
            Оновити
          </Button>
        ]}
      >
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="newKey">Ключ</Label>
            <Input
              id="newKey"
              type="text"
              value={newKey}
              onChange={(e) => {
                setNewKey(e.target.value);
                setIsKeyValid(true);
              }}
              className={cn(!isKeyValid && "border-red-500 focus-visible:ring-red-500")}
              placeholder="Введіть новий ключ"
            />
            {!isKeyValid && (
              <p className="text-sm text-red-500">Некоректний ключ. Спробуйте ще раз.</p>
            )}
          </div>
        </div>
      </UpdateModal>
    </>
  );
}
