"use client";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Header = () => {
  const [theme, SetTheme] = useState(false);
  const [color, setColor] = useState('primary')
  const [bg, setBg] = useState('dark')
  const router = useRouter()
  const isBrowser = typeof window !== 'undefined'

  const changeBg = (val?: string | null) => {
    if (val && isBrowser) {
      localStorage.setItem("bg", `${val}`);
      document.body.classList.remove(bg);
      document.body.classList.add(val)
      setBg(val);
      SetTheme(true)
    }
  };

  const changeTheme = (val: boolean) => {
    if (isBrowser) {
      localStorage.setItem("theme", `${val}`);
      SetTheme(val);
      val
        ? document.body.classList.add(bg)
        : (document.body.classList.remove('dark'), document.body.classList.remove('slate'))
    }
  };

  const changeColor = (val: string) => {
    if (isBrowser) {
      localStorage.setItem("color", `${val}`);
      document.body.classList.remove(color);
      document.body.classList.add(val)
      setColor(val);
    }
  };


  useEffect(() => {

    changeBg(isBrowser && localStorage.getItem('bg') || 'dark')

    changeTheme(
      isBrowser &&
      JSON.parse(
        localStorage.getItem("theme") ||
        `${window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        }`,
      ),
    );

    changeColor(localStorage.getItem("color") || 'primary')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logOut = () => {
    if (isBrowser) {
      localStorage.removeItem('token')
      router.push('/auth')
      toast.success('Logged out successfully', { className: '!bg-content1 !text-foreground' })
    }
  }
  return (
    <header className="flex w-full items-center justify-between bg-background px-4 py-2 text-foreground sm:px-3 sm:py-3 md:px-5">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="logo"
          width={100}
          height={80}
          className="w-12 sm:w-16"
        />
      </Link>
      <div className="flex items-center gap-3 sm:gap-5">
        <div className="checkbox-wrapper-54">
          <label className="switch">
            <input
              type="checkbox"
              checked={theme}
              onChange={(e) => changeTheme(e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
        <Dropdown>
          <DropdownTrigger>
            <div className="h-6 w-6 rounded-full -rotate-45 gradient border-[5px] box-content scale-95 border-content1 cursor-pointer" />
          </DropdownTrigger>
          <DropdownMenu className="theme_dropwdown">
            <DropdownItem className={`!bg-[#006FEE] border-[5px] border-content1 ${color === 'primary' && 'border-none'}`} onClick={() => changeColor('primary')} />
            <DropdownItem className={`!bg-[#9353d3] border-[5px] border-content1 ${color === 'secondary' && 'border-none'}`} onClick={() => changeColor('secondary')} />
            <DropdownItem className={`!bg-[#17c964] border-[5px] border-content1 ${color === 'success' && 'border-none'}`} onClick={() => changeColor('success')} />
            <DropdownItem className={`!bg-[#000] border-[5px] border-content1 ${bg === 'dark' && 'border-none'}`} onClick={() => changeBg('dark')} />
            <DropdownItem className={`!bg-[#1e293b] border-[5px] border-content1 ${bg === 'slate' && 'border-none'}`} onClick={() => changeBg('slate')} />
          </DropdownMenu>
        </Dropdown>
        {isBrowser && localStorage.getItem('token') && <LogOut className="text-primary w-5 font-bold aspect-square p-1 px-[6px] bg-content1 cursor-pointer rounded-full box-content" onClick={logOut} />}
      </div>
    </header>
  );
};

export default Header;
