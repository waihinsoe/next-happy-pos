import AppBar from "./AppBar";

type Props = {
  children: string | JSX.Element | JSX.Element[];
  title?: string;
};

const Layout = (props: Props) => {
  return (
    <div>
      <AppBar title={props.title} />
      {props.children}
    </div>
  );
};

export default Layout;
