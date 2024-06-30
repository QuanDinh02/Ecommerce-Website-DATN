import { useSpring, animated } from "react-spring"

interface IProp {
    n: number
}

const AnimatedNumber = (props: IProp) => {
    const { n } = props;
    const { number } = useSpring({
        from: { number: 0 },
        number: n,
        delay: 500,
        config: { mass: 1, tension: 20 }

    });
    return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>
}

export default AnimatedNumber;