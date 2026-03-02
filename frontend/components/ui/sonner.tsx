"use client"

import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  Loader2,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-right"
      expand={false}
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background/80 group-[.toaster]:backdrop-blur-xl group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:group-[.toaster]:shadow-[0_8px_32px_rgba(0,0,0,0.4)] group-[.toaster]:rounded-2xl group-[.toaster]:p-4 group-[.toaster]:font-sans group-[.toaster]:border-[1.5px]",
          description: "group-[.toast]:text-muted-foreground group-[.toast]:text-[13px] group-[.toast]:mt-1",
          title: "group-[.toast]:font-semibold group-[.toast]:text-[14px]",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-xl group-[.toast]:px-4 group-[.toast]:py-2 group-[.toast]:text-xs group-[.toast]:font-bold group-[.toast]:transition-all group-[.toast]:hover:opacity-90",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-xl group-[.toast]:px-4 group-[.toast]:py-2 group-[.toast]:text-xs group-[.toast]:font-bold group-[.toast]:transition-all group-[.toast]:hover:bg-muted/80",
          success: "group-[.toast]:!bg-emerald-50/50 dark:group-[.toast]:!bg-emerald-500/10 group-[.toast]:!border-emerald-500/20 group-[.toast]:!text-emerald-700 dark:group-[.toast]:!text-emerald-400",
          error: "group-[.toast]:!bg-red-50/50 dark:group-[.toast]:!bg-red-500/10 group-[.toast]:!border-red-500/20 group-[.toast]:!text-red-700 dark:group-[.toast]:!text-red-400",
          warning: "group-[.toast]:!bg-amber-50/50 dark:group-[.toast]:!bg-amber-500/10 group-[.toast]:!border-amber-500/20 group-[.toast]:!text-amber-700 dark:group-[.toast]:!text-amber-400",
          info: "group-[.toast]:!bg-blue-50/50 dark:group-[.toast]:!bg-blue-500/10 group-[.toast]:!border-blue-500/20 group-[.toast]:!text-blue-700 dark:group-[.toast]:!text-blue-400",
        },
      }}
      icons={{
        success: <CheckCircle2 className="size-5 text-emerald-500" />,
        info: <Info className="size-5 text-blue-500" />,
        warning: <AlertTriangle className="size-5 text-amber-500" />,
        error: <AlertCircle className="size-5 text-red-500" />,
        loading: <Loader2 className="size-5 animate-spin text-primary" />,
      }}
      {...props}
    />
  )
}

export { Toaster }

