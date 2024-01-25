import SearchBar from "./components/Searchbar";
import Header from "./components/Header";
import { seedData } from "./components/Beach";
import Spinner from "./components/Spinner";

if (!localStorage.getItem("seedBeachs")) {
  seedData();
  }
  

const date = new Date();
const YYYY = date.getFullYear()
const MM = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
const DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
export let hh = date.getHours() - 1;
hh = hh < 10 ? "0" + hh : hh;

export const YYYYMMDD = YYYY.toString() + MM.toString() + DD.toString()


export default function App() {

  return (
    <>
      <div
        className="bg-main w-[100vw] max-w-[100%] min-h-[100vh] bg-cover bg-no-repeat bg-scroll pb-5"
      >
        <Header />
        <SearchBar />
      </div>
    </>
  )
}