import AppBar from "./AppBar";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const Layout = (props: Props) => {
  return (
    <div>
      <AppBar />
      {props.children}
    </div>
  );
};

export default Layout;
