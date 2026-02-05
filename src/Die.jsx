export default function Die(props) {
    const isHeld = props.diceObj.isHeld ? "#59E319" : ""
    return (
        <button aria-pressed={props.diceObj.isHeld} aria-label={`Die with value ${props.diceObj.value}, ${props.diceObj.isHeld ? "held" : "not held"}`} onClick={() => props.onClick(props.diceObj.id)} style={{backgroundColor: isHeld}}>{props.diceObj.value}</button>
    )
}