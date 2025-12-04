import { useTheme } from "@/components/themeProvider";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-right"
      duration={4000}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:dark:bg-zinc-900 group-[.toaster]:text-zinc-950 group-[.toaster]:dark:text-zinc-50 group-[.toaster]:border-zinc-200 group-[.toaster]:dark:border-zinc-800 group-[.toaster]:shadow-xl group-[.toaster]:text-base group-[.toaster]:font-medium group-[.toaster]:p-6",
          description:
            "group-[.toast]:text-zinc-500 group-[.toast]:dark:text-zinc-400 group-[.toast]:text-sm",
          actionButton:
            "group-[.toast]:bg-zinc-900 group-[.toast]:dark:bg-zinc-50 group-[.toast]:text-zinc-50 group-[.toast]:dark:text-zinc-900",
          cancelButton:
            "group-[.toast]:bg-zinc-100 group-[.toast]:dark:bg-zinc-800 group-[.toast]:text-zinc-500 group-[.toast]:dark:text-zinc-400",
          error:
            "group-[.toaster]:!border-red-500 group-[.toaster]:!text-red-600 group-[.toaster]:dark:!text-red-400",
          success:
            "group-[.toaster]:!border-emerald-500 group-[.toaster]:!text-emerald-600 group-[.toaster]:dark:!text-emerald-400",
          warning:
            "group-[.toaster]:!border-yellow-500 group-[.toaster]:!text-yellow-600 group-[.toaster]:dark:!text-yellow-400",
          info: "group-[.toaster]:!border-blue-500 group-[.toaster]:!text-blue-600 group-[.toaster]:dark:!text-blue-400",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
