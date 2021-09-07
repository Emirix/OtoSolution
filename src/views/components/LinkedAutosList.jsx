import { useTable,useSortBy,useFilters,usePagination } from 'react-table'
import React ,{useEffect,useState} from "react" 
import ColumnFilter from './ColumnFilter'
import axios from "axios"
import { useHistory } from 'react-router-dom'

 export default function LinkedAutosList() {
  const history = useHistory();

  const [carList,setCarList] = useState([]);
  const [paginationCount,setPaginationCount] = useState(0)
  const [next,setNext] = useState("");
  const [prev,setPrev] = useState("");
  const [pageNum,setPageNum] = useState(1)
  
  var newCarList = [];

  const [colors,setColors] = useState([])
  var months = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec",
  };
  function getList(url,c){
    setCarList([])
 
    axios.get(url,{
        headers:{
            "Authorization" : `Token ${localStorage.getItem("key")}`
        }
    }).then(res=>{
        
        
        res.data.map((val,i)=>{
        
        newCarList.push({
            
            col1:val.manufacture_date ? months[val.manufacture_date.substring(5, 7)] + " " + val.manufacture_date.substring(8, 10) + " " +  val.manufacture_date.substring(0, 4) : "",
            col2:val.serial_no,
            col3:val.version,
            col4:val.model,
            col5:months[val.created_at.substring(5, 7)] + " " + val.created_at.substring(8, 10) + " " +  val.created_at.substring(0, 4)   ,
            col5:months[val.updated_at.substring(5, 7)] + " " + val.updated_at.substring(8, 10) + " " +  val.updated_at.substring(0, 4) ,
            id:val.id
            })
        })

   
      
     setCarList(newCarList)
     
    })
  }


  useEffect(()=>{


      getList("/api/devices/oto-link-devices/")
  
      setPageSize(9999)
    
   
  },[])


   const data = carList

     
  
 


   const columns = React.useMemo(
    () => [
      {
        Header: 'Manufacture Date',
        Filter : ColumnFilter,
        accessor: 'col1', 
        
        width:140
      },
      {
        Header: 'Serial No',
        Filter : ColumnFilter,
        accessor: 'col2',
        width:140
      },

      {
       Header: 'Version', Filter : ColumnFilter,
       accessor: 'col3',
       width:80
     },

     {
       Header: 'Model', Filter : ColumnFilter,
       accessor: 'col4',
       width:70
     },

     {
       Header: 'Created At', Filter : ColumnFilter,
       accessor: 'col5',
       width:70
     },


     {
       Header: 'Updated At', Filter : ColumnFilter,
       accessor: 'col6',
       width:60
     },


    
     {
       Header: '', Filter : "",
       accessor: 'col15',width:25,
       Cell: ({ cell }) => (
         <div className="edit-button"  onClick={e=>{
          
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
     setPageSize,

     prepareRow,
     state: { pageIndex, pageSize  },
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
     
      </>
   )
 }