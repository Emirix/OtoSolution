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
 
    axios.get(url,{
      headers:{
        "Authorization" : `Token ${localStorage.getItem("key")}`
      }
    }).then(res=>{
      console.log(Number(res.data.count) / 10)    
      setPaginationCount(Math.round(Number(res.data.count) / 10))
      if(res.data.next != null || res.data.next != undefined){
        setNext(res.data.next)
        console.log("Next: " + next)
      }else{
        setNext("")
      }

      if(res.data.previous != null || res.data.previous != undefined){
        setPrev(res.data.previous)
        console.log("Prev: " + prev)
      }else{
        setPrev("")
      }
      res.data.results.map((val,i)=>{
        
        newCarList.push({
          col1: val.name,
          col2:val.address,
          col3:"9",
          col4: "7",
          col5: val.created_at.substring(0,10).replaceAll("-","/"),
          col6:val.updated_at.substring(0,10).replaceAll("-","/"),
          
        })

        newCarList.push({
          col1: val.name,
          col2:val.address,
          col3:"9",
          col4: "7",
          col5: val.created_at.substring(0,10).replaceAll("-","/"),
          col6:val.updated_at.substring(0,10).replaceAll("-","/"),
          
        })
      })

      setPageNum(url.charAt(url.length- 1))
   
      
     setCarList(newCarList)
      console.log(carList)
    })
  }

  useEffect(()=>{

    getList("/admin/api/dealers/?page=1",)
   
  },[])


   const data = carList

     
  
 


   const columns = React.useMemo(
    () => [
      {
        Header: 'Dealer',
        Filter : ColumnFilter,
        accessor: 'col1', 
        
        width:180
      },
      {
        Header: 'Name',
        Filter : ColumnFilter,
        accessor: 'col2',
        width:90
      },

      {
       Header: 'Location', Filter : ColumnFilter,
       accessor: 'col3',
       width:50
     },

     {
       Header: 'Total Cars', Filter : ColumnFilter,
       accessor: 'col4',
       width:50
     },

     {
       Header: 'Created', Filter : ColumnFilter,
       accessor: 'col5',
       width:70
     },


     {
       Header: 'Updated', Filter : ColumnFilter,
       accessor: 'col6',
       width:60
     },

    
 

   
     

     {
       Header: '', Filter : "",
       accessor: 'col7',width:25,
       Cell: ({ cell }) => (
         <div className="edit-button"  onClick={e=>{
          console.log(cell)
          history.push("/vehicle-details/"+cell.row.original.id)
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
         {carList.length == 0 ? <div><Spinner color="#61dafb"/></div> : page.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                   <td
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