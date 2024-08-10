type Props={
    selectedPrice?:number;
    onChange:(value?:number)=>void;

}

function PriceFilter({selectedPrice,onChange}:Props) {
  return (
    <div>
        <h4 className="text-md font-semibold mb-2"> Select Price </h4>
            <select value={selectedPrice} onChange={(event)=>onChange(
                event.target.value?parseInt(event.target.value):undefined
            )} name="" id="">
                <option value="">Select Max Price</option>
            {[40,10000,200000,3000,12000].map((price)=>(
                <option value={price}>{price}</option>
            ))}

            </select>
      
    </div>
  )
}

export default PriceFilter