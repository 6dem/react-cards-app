import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { Header } from "../Header"
import { Loader } from "../Loader"
import cls from "./MainLayout.module.css"

export const MainLayout = () => {
    const currentYear = new Date().getFullYear()

    return (
        <>
            <div className={cls.mainLayout}>
                <Header />
                <div className={cls.mainWrapper}>
                    <main className={cls.main}>
                        <Suspense fallback={<Loader />}>
                            <Outlet />
                        </Suspense>
                    </main>
                    <footer className={cls.footer}>
                        React Question Application | {currentYear} <br />
                        by Edem Ablaev
                    </footer>
                </div>
            </div>

            <ToastContainer />
        </>
    )
}
