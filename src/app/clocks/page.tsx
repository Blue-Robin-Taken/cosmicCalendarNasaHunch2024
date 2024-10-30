export default function Clocks(){
    // Generate all GMT Divs
    const divList = []
    for (let x=-12; x<=12; x++){
        divList.push(x)
    }
    const mapped = divList.map((number,index)=>{
        return (<><div key={number}>{number}</div></>)
    })

    return (<>
    <div key="holder">
        {mapped}
    </div>
    </>)
}