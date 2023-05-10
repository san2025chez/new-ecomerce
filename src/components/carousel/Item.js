import { Paper, Button } from '@mui/material'
function Item({item})
{
    console.log("LLEGA",item);
    return (
        <Paper>
            <div style={{display:"flex", justifyContent:"center",backgroundColor:"black"}}>
            <img src={item.imagen} alt={item.title} style={{width:"50%", height: "50%"}}/>            
            </div>
            <h2>{item.title}</h2>
            <p>{item.title}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}
export default Item;