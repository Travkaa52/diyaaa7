import React, { useState, useEffect, forwardRef } from 'react';
import Link from 'next/link';
// Імпортуємо всі потрібні іконки з однієї бібліотеки (припускаємо Lucide)
import { 
  Mail, KeyRound, History, Settings, RefreshCw, Smartphone, 
  HeadphonesIcon, Copy, HelpCircle, X, AlignLeft, FileText, Zap, User 
} from 'lucide-react'; 

// ----------------------------------------------------------------------
// ЗАГЛУШКИ ДЛЯ ЗОВНІШНІХ ФУНКЦІЙ (r(6823), r(5187))
// ----------------------------------------------------------------------
// Реальні функції для роботи з даними користувача та валідації ключа.
// Замініть ці заглушки на ваші фактичні утиліти.

/** Отримує дані користувача (із r(6823) -> f.is) */
const getUserData = async () => {
  // Заглушка: повертає тестові дані
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
  // Тут була б логіка збереження
  return true;
}; 

/** Валідує ключ (із r(5187) -> h.q) */
const validateKey = (key) => key === "valid_key"; 
// ----------------------------------------------------------------------


// ----------------------------------------------------------------------
// УТИЛІТИ ТА БАЗОВІ КОМПОНЕНТИ (Input, Label, Button, cn)
// ----------------------------------------------------------------------

// Припускаємо, що це twMerge (з r(4508) -> l.cn)
const cn = (...args) => args.filter(Boolean).join(' ');

// Компонент Button (з r(2869) -> a.z)
const Button = forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Component = asChild ? 'span' : 'button';
    const buttonVariants = {
        default: "bg-black text-white hover:bg-gray-800", // Спрощений варіант
        outline: "border border-black bg-transparent hover:bg-gray-100",
    };
    const sizeVariants = {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
    };
    
    return (
        <Component
            className={cn(
                "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
                buttonVariants[variant] || buttonVariants.default,
                sizeVariants[size] || sizeVariants.default,
                className
            )}
            ref={ref}
            {...props}
        />
    );
});
Button.displayName = 'Button';

// Компонент Input (з r(4508) -> o)
const Input = forwardRef(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = 'Input';

// Компонент Label (з r(535) та r(1107) -> u)
const Label = forwardRef(({ className, ...props }, ref) => (
  <label
    className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
    ref={ref}
    {...props}
  />
));
Label.displayName = 'Label';


// ----------------------------------------------------------------------
// 2. МОДАЛЬНЕ ВІКНО ОНОВЛЕННЯ ДАНИХ (p)
// ----------------------------------------------------------------------

// Функція генерації шляху підпису (з m)
const generateSignaturePath = () => {
    let e = "M 10 15";
    for (let t = 1; t <= 3; t++) {
        let r = 100 / 3 * t - 10 + 20 * Math.random(),
            n = 15 + 20 * Math.random() - 10,
            s = 100 / 3 * t + 20 * Math.random() - 10,
            i = 15 + 20 * Math.random() - 10;
        e += " C " + r + " " + n + ", " + s + " " + i + ", " + (100 / 3 * t + 10) + " " + 15
    }
    return e;
};

// Генерація номерів документів (y, N, Z)
const generateDeviceNumber = () => "DEV-" + Math.floor(1e8 + 9e8 * Math.random()).toString();
const generateTaxNumber = () => "TAX-" + Math.floor(1e9 + 9e9 * Math.random()).toString();
const generatePassportNumber = () => "PAS-" + Math.floor(1e8 + 9e8 * Math.random()).toString();


function UpdateModal({ onClose }) {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Функція для перетворення файлу в Base64
  const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name && birthDate && file && key) {
      if (!validateKey(key)) {
        setErrorMessage("Невірний ключ. Будь ласка, перевірте та спробуйте ще раз.");
        return;
      }

      setIsLoading(true);
      try {
        const imageBase64 = await fileToBase64(file);
        // Формат дати, як у мінімізованому файлі: '11-08-2007' -> '11.08.2007'
        const formattedBirthDate = birthDate.split("-").join("."); 
        
        const existingData = await getUserData();
        
        // Використовуємо існуючі номери або генеруємо нові (логіка з мінімізованого файлу)
        const deviceNumber = existingData?.deviceNumber || generateDeviceNumber();
        const taxCardNumber = existingData?.taxCardNumber || generateTaxNumber();
        const passportNumber = existingData?.passportNumber || generatePassportNumber();
        
        const signaturePath = generateSignaturePath();

        await saveUserData(
          name, 
          formattedBirthDate, 
          imageBase64, 
          deviceNumber, 
          signaturePath, 
          taxCardNumber, 
          passportNumber, 
          key
        );
        onClose(); // Закриваємо модалку після успішного збереження

      } catch (error) {
        console.error("Error saving data:", error);
        alert("Помилка при збереженні даних. Спробуйте ще раз.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Оновлення даних</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <Label htmlFor="name">ПІБ</Label>
            <Input id="name" value={name} onChange={e => setName(e.target.value)} className="mt-1" required />
          </div>
          <div>
            <Label htmlFor="birthDate">Дата народження (DD.MM.YYYY)</Label>
            <Input 
                id="birthDate" 
                type="text" 
                value={birthDate} 
                onChange={e => setBirthDate(e.target.value)} 
                className="mt-1" 
                placeholder="Наприклад, 11-08-2007"
                required 
            />
          </div>
          <div>
            <Label htmlFor="file">Фото профіля</Label>
            <Input 
                id="file" 
                type="file" 
                accept="image/*" 
                onChange={e => setFile(e.target.files?.[0] || null)} 
                className="mt-1" 
                required 
            />
          </div>
          <div>
            <Label htmlFor="key">Ключ</Label>
            <Input 
                id="key" 
                value={key} 
                onChange={e => {setKey(e.target.value); setErrorMessage("")}} 
                className={cn("mt-1", errorMessage && "border-red-500")} 
                required 
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Збереження..." : "Зберегти дані"}
          </Button>
        </form>
      </div>
    </div>
  );
}


// ----------------------------------------------------------------------
// 3. НИЖНЯ НАВІГАЦІЯ (L)
// ----------------------------------------------------------------------
function BottomNavigation() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-10">
            <div className="flex justify-around items-center bg-black text-white h-[80px] pb-[20px] text-[10px]">
                <Link href="/home" className="flex flex-col items-center gap-1 w-1/4">
                    <AlignLeft className="text-white w-[22px] h-[22px]" />
                    <span>Стрічка</span>
                </Link>
                <Link href="/documents" className="flex flex-col items-center gap-1 w-1/4">
                    <FileText className="text-white w-[22px] h-[22px]" />
                    <span>Документи</span>
                </Link>
                <Link href="/services" className="flex flex-col items-center gap-1 w-1/4">
                    <Zap className="text-white w-[22px] h-[22px]" />
                    <span>Сервіси</span>
                </Link>
                <Link href="/menu" className="flex flex-col items-center gap-1 w-1/4">
                    <User className="text-white w-[22px] h-[22px]" />
                    <span>Меню</span>
                </Link>
            </div>
        </nav>
    );
}

// ----------------------------------------------------------------------
// 4. ГОЛОВНИЙ КОМПОНЕНТ СТОРІНКИ МЕНЮ (g)
// ----------------------------------------------------------------------

export default function MenuPage() {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [userData, setUserData] = useState(null);

    // Завантаження даних користувача при завантаженні сторінки
    useEffect(() => {
        (async () => {
            setUserData(await getUserData());
        })();
    }, []);

    // Обробник для копіювання номера пристрою
    const handleMenuItemClick = (text) => {
        if (text === "Оновити застосунок") {
            setShowUpdateModal(true);
        } else if (text === "Копіювати номер пристрою") {
            const deviceNumber = userData?.deviceNumber;
            if (deviceNumber) {
                // Мінімізований файл використовує alert, а не toast
                navigator.clipboard.writeText(deviceNumber).then(() => {
                    alert("Номер пристрою скопійовано в буфер обміну");
                });
            } else {
                alert("Номер пристрою не знайдено");
            }
        }
    };

    // Елементи меню (відновлено з масиву у мінімізованому файлі)
    const menuItems = [
        { icon: Mail, text: "Повідомлення" },
        { icon: KeyRound, text: "Дія.Підпис" },
        { icon: History, text: "Історія підписань" },
        { icon: Settings, text: "Налаштування" },
        { icon: RefreshCw, text: "Оновити застосунок" },
        { icon: Smartphone, text: "Підключені пристрої" },
        { icon: HeadphonesIcon, text: "Служба підтримки" },
        { icon: Copy, text: "Копіювати номер пристрою" },
        { icon: HelpCircle, text: "Питання та відповіді" }
    ];

    return (
        <main className="min-h-[100dvh] max-h-[100dvh] bg-gradient-to-b from-[#7AC7C0] via-[#B8D7EA] to-[#C5B6E0] pb-[120px] pt-14 overflow-y-auto">
            <div className="px-5 flex flex-col gap-3 max-w-md mx-auto">
                <div className="mb-2">
                    <h1 className="text-[28px] font-semibold mb-0.5">Меню</h1>
                    <p className="text-[13px] text-gray-600">Версія Дії: 4.16.4.1908</p>
                </div>
                
                <div className="flex flex-col gap-2">
                    {menuItems.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                            <button
                                key={index}
                                className="flex items-center gap-3 bg-white rounded-2xl p-4 active:bg-gray-50 shadow-sm"
                                onClick={() => handleMenuItemClick(item.text)}
                            >
                                <IconComponent className="w-[22px] h-[22px] text-gray-700" />
                                <span className="text-[15px] text-gray-800">{item.text}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <BottomNavigation />
            
            {showUpdateModal && (
                <UpdateModal 
                    onClose={() => {
                        setShowUpdateModal(false);
                        // Оновлюємо дані після закриття модалки (як у мінімізованому файлі)
                        getUserData().then(setUserData);
                    }}
                />
            )}
        </main>
    );
}
