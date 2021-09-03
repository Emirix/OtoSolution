<input value={data != null ?  data.name : name} onChange={e=>setName(e.target.value)}  placeholder="*Name" />
<input  value={data !== null ? data.description : desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" />
<input  value={data !== null ? data.address : adress} onChange={e=>setAdress(e.target.value)} placeholder="Address" />
<input  value={data !== null ? data.state : state} onChange={e=>setState(e.target.value)} placeholder="State" />
<input  value={data !== null ? data.p1_lat : p1} onChange={e=>setP1(e.target.value)} type="number" placeholder="*P1 lat" />
<input  value={data !== null ? data.p1_lon : p2} onChange={e=>setP2(e.target.value)} type="number" placeholder="*P1 lon" />
<input  value={data !== null ? data.radius : radius} onChange={e=>setRadius(e.target.value)} type="number" placeholder="*Radius" />
