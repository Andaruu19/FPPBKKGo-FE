// src/app/page.tsx
import Image from "next/image";

export default function Home() {
  return (
    <section className="dark:bg-gray-900">
      <div className="mx-auto flex h-screen max-w-screen-xl items-center justify-center text-center">
        <figure className="mx-auto max-w-screen-md">
          <section className="mt-6 flex items-center justify-center space-x-3 py-8">
            <Image
              className="w-128"
              src="/images/logo-main.png"
              alt="Logo"
              width={512}
              height={128}
            />
          </section>
          <svg
            className="mx-auto mb-3 h-12 text-gray-400 dark:text-gray-600"
            viewBox="0 0 24 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
              fill="currentColor"
            />
          </svg>
          <blockquote>
            <p className="text-2xl font-medium text-white">
              "Proyek kecil untuk Final Project Laravel PBKK, karena programmer
              nya skill issue yaa jadi kita namain nextfix aja karena ngefix nya
              nggak selesai-selesai"
            </p>
          </blockquote>
          <figcaption className="mt-6 flex items-center justify-center space-x-3">
            <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
              <div className="pr-3 text-sm font-light text-white">
                Adnan Abdullah Juan (5025221155)
              </div>
              <div className="pl-3 text-sm font-light text-white">
                Farel Hanif Andaru (5025221253)
              </div>
            </div>
          </figcaption>
          <div className="justify-center py-2 pr-3 text-sm font-light text-white">
            Kelompok - 21
          </div>
        </figure>
      </div>
    </section>
  );
}
