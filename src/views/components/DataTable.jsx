import { useTable,useSortBy,useFilters,usePagination } from 'react-table'
import React ,{useEffect,useState} from "react" 
import ColumnFilter from './ColumnFilter'
import Spinner  from './Spinner/Spinner'
import axios from "axios"
import { useHistory } from 'react-router-dom'
 export default function DataTable() {
  const history = useHistory();

  const [carList,setCarList] = useState([]);
  const [paginationCount,setPaginationCount] = useState(0)
  const [next,setNext] = useState("");
  const [prev,setPrev] = useState("");
  const [pageNum,setPageNum] = useState(1)
  
  var newCarList = [];

  const [colors,setColors] = useState([])

  function getList(url,c){
    setCarList([])
 
    axios.get(url).then(res=>{
      console.log(Number(res.data.count) / 10)    
      setPaginationCount(Math.round(Number(res.data.count) / 10))
      if(res.data.next != null || res.data.next != undefined){
        setNext(res.data.next.replace("http","https"))
        console.log("Next: " + next)
      }else{
        setNext("")
      }

      if(res.data.previous != null || res.data.previous != undefined){
        setPrev(res.data.previous.replace("http","https"))
        console.log("Prev: " + prev)
      }else{
        setPrev("")
      }
      res.data.results.map((val,i)=>{
        
        newCarList.push({
          col1: val.stock_no,
          col2:val.vin.vin,
          col3:"",
          col4: val.vin.brand_name,
          col5: val.vin.model_name,
          col6:val.year,
          col7:c[val.color].name,
          col8:"",
          col9: "",
          col10:val.created_at.substring(0,10).replaceAll("-","/"),
          col11:"",
          col12:val.connection_type || "",
          col13:val.status || "Running",
          id:val.id
        })
      })

      setPageNum(url.charAt(url.length- 1))
   
      
     setCarList(newCarList)
      console.log(carList)
    })
  }

  useEffect(()=>{


    
    

    axios.get("/api/utils/color/names",{
      headers:{
        "Authorization" : `Token ${localStorage.getItem("key")}`
      }
    }).then(color=>{
      setColors(color.data)
      
      getList("/api/dealer/vehicles/?page=1",color.data)
    
    })


   
  },[])


   const data = carList

     
  
 


   const columns = React.useMemo(
    () => [
      {
        Header: 'STK',
        Filter : ColumnFilter,
        accessor: 'col1', 
        
        width:80
      },
      {
        Header: 'VIN',
        Filter : ColumnFilter,
        accessor: 'col2',
        width:140
      },

      {
       Header: 'Serial ID', Filter : ColumnFilter,
       accessor: 'col3',
       width:80
     },

     {
       Header: 'Make', Filter : ColumnFilter,
       accessor: 'col4',
       width:70
     },

     {
       Header: 'Model', Filter : ColumnFilter,
       accessor: 'col5',
       width:70
     },


     {
       Header: 'Year', Filter : ColumnFilter,
       accessor: 'col6',
       width:60
     },

     {
       Header: 'Color', Filter : ColumnFilter,
       accessor: 'col7',
       width:70
     },

     {
       Header: 'Type', Filter : ColumnFilter,
       accessor: 'col8',
       width:60
     },

     
     {
       Header: 'Dealer', Filter : ColumnFilter,
       accessor: 'col9',
       width:80
     },

     
     {
       Header: 'Created', Filter : ColumnFilter,
       accessor: 'col10',
       width:70
     },

     
     {
       Header: 'Updated', Filter : ColumnFilter,
       accessor: 'col11',
       width:70

     },

     
     {
       Header: 'Connection', Filter : ColumnFilter,
       accessor: 'col12',
       width:100
     },

     
     {
       Header: 'Status', Filter : ColumnFilter,
       accessor: 'col13',
       width:90,
       status:"running",
       Cell: ({ cell }) => (
           <span className={"row-status row-status-running"}  >
             {cell.row.values.col13}
           </span>
         )
     },

     {
       Header: '', Filter : "",
       accessor: 'col14',
       width:25,
       Cell: ({ cell }) => (
        <div className="refresh-button" onClick={e=>{
          console.log(cell)
          getList("/api/dealer/vehicles/?page="+pageNum,colors)
  }}>
         </div>
       )
   
     },

     {
       Header: '', Filter : "",
       accessor: 'col15',width:25,
       go:false,
       Cell: ({ cell }) => (
         <div className="edit-button"  onClick={e=>{
          console.log(cell)
          history.push("/add-new-car/?edit=true&id="+cell.row.original.id)
      }}>
          
         </div>
       )
     },
    ],
    []
  )
   
 
   const {
     getTableProps,
     getTableBodyProps,
     headerGroups,
     
     page,
  
     pageCount,
     gotoPage,
     
     prepareRow,
     state: { pageIndex, pageSize },
   } = useTable({ columns, data ,initialState: { pageIndex: 0 },},useFilters,useSortBy,usePagination)
 
   return (<>
     <table {...getTableProps()} >
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps(column.getSortByToggleProps())}
                 className="datatable-th"
                 style={{width:column.width, maxWidth:column.width}}
               >
                 {column.render('Header')}
                 {column.isSorted ? (column.isSortedDesc ? <svg width="12" height="12" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 2L3 1H5L4 2Z" stroke="black" strokeWidth="2"/>
</svg>
 : <svg width="12" height="12" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M4 2L5 3L3 3L4 2Z" stroke="black" strokeWidth="2"/>
 </svg>
 ) : ""}
                 <div>{column.canFilter ? column.render("Filter"):""}</div>
                
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {carList.length == 0 ? <>
          <tr>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
            </tr>

            <tr>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
            </tr>

            <tr>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
            </tr>

            <tr>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
            </tr>

            <tr>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
            </tr>

            <tr>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
            </tr>

            <tr>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
            </tr>

            <tr>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
            </tr>

            <tr>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
            </tr>

            <tr>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
               <td><div className="skeleton-text-yuksek"></div></td>
            </tr>
         </> : page.map(row => {
           prepareRow(row)
           return (
             <tr title="Click for details" className="tr-hover" {...row.getRowProps()} >
               {row.cells.map((cell,i) => {
                 return (
                   <td
                   onClick={e=>{
                     if(i != 14){
                      history.push("/vehicle-details/"+row.original.id)}
                     }
                   }
                     {...cell.getCellProps()}
                     className="datatable-td"
                   >
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
       <tbody>
       
       </tbody>
     </table>
        <div className="emir-pagination">
    
        <button className="pagi-out" onClick={() => getList(prev,colors)} disabled={prev == "" ? true : false}>
          Previous
        </button>
        
        
            {
              Array(paginationCount).fill(1).map((val,i)=>{
                return(
                  <div onClick={()=>{
                    setPageNum(i+1)
                     getList("/api/dealer/vehicles/?page="+(i+1),colors)
                  }} className={pageNum == i+1 ? "pagi-num pagi-active" : "pagi-num"} >
                  {i+1}
                
                </div>
                )
              })
            }
             

         
         <button className="pagi-out" disabled={next == "" ? true : false} onClick={() => getList(next,colors)}>
          Next
        </button>
          
       
      </div>
      </>
   )
 }