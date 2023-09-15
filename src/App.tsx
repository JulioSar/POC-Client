import "./App.css";
import { UsersAdmin } from "@/components/UsersAdmin/UsersAdmin";
import { Header } from "@/components/Header/Header";
import { SideBar } from "@/components/SideBar/SideBar";
import { ThemeProvider } from "@/components/Theme/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <div className="grid grid-flow-col grid-cols-[18%_82%] grid-rows-[8rem_30rem_30rem] gap-0  ">
        <section className="row-span-3">
          <SideBar />
        </section>
        <section className="col-span-2 shadow-lg max-h-28 flex flex-col justify-center">
          <Header />
        </section>
        <section className="row-span-2 col-span-2">
          <UsersAdmin />
        </section>
      </div>
    </ThemeProvider>
  );
}

export default App;
