interface FooterProps {
    title: string,
}

const Footer = (props: FooterProps) => {
    return <span>{props.title}</span>
}

export default Footer;