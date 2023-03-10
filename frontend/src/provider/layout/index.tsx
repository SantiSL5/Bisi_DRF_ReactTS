import Footer from "./footer";
import Header from "./header";


const Layout = (props: any) => {
    return (
        <div style={{
            display: "flex",
            flexFlow: "column",
            // backgroundColor: "fuchsia"
            backgroundColor: "#303039"
        }}>
            <Header title="Bisi"></Header>
            {props.children}
            <Footer title="A"></Footer>
        </div>
    );
}

export default Layout;