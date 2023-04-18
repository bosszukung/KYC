import "./caseCount.css" 
export const caseCount = ({
    count,
    heading,
}) => {
    const format = (count) => {
        if (count < 100) {
            return `0${count}`
        }
        return count
    };

    return (
        <div className='count'>
            <span className='format'>{format(count)}</span>
            <span className='heading'>{heading.split(" ")[0]}</span>
            <br/>
            <span className='heading'>{heading.split(" ")[1]}</span>
        </div>
    )
}