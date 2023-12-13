import Routes from "./routes";
import MainContextProvider, { MainContext } from "./stores/mainContext";

function App() {

    return (
        <MainContextProvider>
            <Routes />
        </MainContextProvider>
    )
}

export default App;