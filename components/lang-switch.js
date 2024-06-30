"use client"

import * as React from "react"
import { useState, useEffect, useContext } from 'react'
import { GlobeIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function LangToggle() {
  const [mount, setMount] = useState(false);

  useEffect(() => {
      setMount(true);

      if (!localStorage.getItem('lang_setting')) {
          localStorage.setItem('lang_setting', 'en')
      }
  }, []);

  const changeLang = (langCode) => {
    localStorage.setItem('lang_setting', langCode.toString());

    window.location.reload();
  }

  const l = {
    ko: "한국어",
    en: "English",
    ja: "日本語",
    chs: "简体中文",
    cht: "繁體中文",
    de: "Deutsch",
    es: "Español",
    fr: "Français",
    pt: "Português",
    id: "Bahasa Indonesia",
    ru: "Русский",
    th: "ภาษาไทย",
    vi: "Русский",
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <GlobeIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <GlobeIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Change Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.keys(l).map((value) => (
          <DropdownMenuItem key={l} onClick={() => changeLang(value)}>{l[value]}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
