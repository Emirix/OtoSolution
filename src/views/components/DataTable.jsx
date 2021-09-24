import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import React, { useEffect, useState } from "react";
import ColumnFilter from "./ColumnFilter";
import Spinner from "./Spinner/Spinner";
import axios from "axios";
import { useHistory } from "react-router-dom";
export default function DataTable({ lotFiltre, dealerFiltre }) {
  const history = useHistory();

  const [carList, setCarList] = useState([]);
  const [orj, setOrj] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [paginationCount, setPaginationCount] = useState(0);
  const [next, setNext] = useState("");
  const [prev, setPrev] = useState("");
  const [pageNum, setPageNum] = useState(1);

  var newCarList = [];
  var newOrj = [];

  const [colors, setColors] = useState([]);
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

  function getList(url, c) {
    setCarList([]);

    axios.get(url).then((res) => {
      
      setPaginationCount(Math.ceil(Number(res.data.count) / 10));
      if (res.data.next != null || res.data.next != undefined) {
        setNext(res.data.next.replace("http", "https"));
      } else {
        setNext("");
      }

      if (res.data.previous != null || res.data.previous != undefined) {
        setPrev(res.data.previous.replace("http", "https"));
      } else {
        setPrev("");
      }
      console.log(res.data)
      res.data.results.map((val, i) => {
        newCarList.push({
          col1: val.stock_no,
          col2: val.vin.vin,
          col3: val.device != null ? val.device.id : "No Device",
          col4: val.vin.brand_name,
          col5: val.vin.model_name,
          col6: val.year,
          col7: val.color != null ? c[val.color].name : "Unspecified",
          col8: val.inventory_type == 1 ? "New" : val.inventory_type == 2 ? "Used" : "No Data",
          col9: val.dealer != null ? val.dealer.name :"No Dealer",
          col10: months[val.created_at.substring(5, 7)] + " " + val.created_at.substring(8, 10) + " " +  val.created_at.substring(0, 4) ,
          col11: "",
          col12: val.connection_type == 1 ? "Wired" : val.connection_type == 2 ? "Wireless" : "Null",
          col13:  val.status,
          id: val.id,
        });
      });

      setPageNum(url.charAt(url.length - 1));

      setOrj(newCarList);
      setCarList(newCarList);

  
    });
  }


  useEffect(() => {
    axios
      .get("/api/utils/color/names", {
        headers: {
          Authorization: `Token ${localStorage.getItem("key")}`,
        },
      })
      .then((color) => {
        setColors(color.data);

        getList("/api/dealer/vehicles/?page=1", color.data);
      });
  }, []);

  const data = carList;

  const statusler = [
    {
      status:0,
      title:"Power Off",
      renk:"status-poweroff",
      aciklama:"Oto-link power off"
    },
    {
      status:1,
      title:"Not Connected",
      renk:"status-not-connected",
      aciklama:"Oto-Link on but not connected"
    },
    {
      status:2,
      title:"Connected",
      renk:"status-connected",
      aciklama:"Oto-Link Present and connected to OBD"
    },
    {
      status:3,
      title:"ACC On",
      renk:"status-acc-on",
      aciklama:"Ignition on, engine off"
    },
    {
      status:4,
      title:"Engine On",
      renk:"status-engine-on",
      aciklama:"Engine running, car stationary"
    },
    {
      status:5,
      title:"Moving",
      renk:"status-moving"
    }
  ]

  const columns = React.useMemo(
    () => [
      {
        Header: "STK",
        Filter: ColumnFilter,
        accessor: "col1",

        width: 80,
      },
      {
        Header: "VIN",
        Filter: ColumnFilter,
        accessor: "col2",
        width: 140,
      },

      {
        Header: "Serial ID",
        Filter: ColumnFilter,
        accessor: "col3",
        width: 80,
      },

      {
        Header: "Make",
        Filter: ColumnFilter,
        accessor: "col4",
        width: 70,
      },

      {
        Header: "Model",
        Filter: ColumnFilter,
        accessor: "col5",
        width: 70,
      },

      {
        Header: "Year",
        Filter: ColumnFilter,
        accessor: "col6",
        width: 60,
      },

      {
        Header: "Color",
        Filter: ColumnFilter,
        accessor: "col7",
        width: 70,
      },

      {
        Header: "Type",
        Filter: ColumnFilter,
        accessor: "col8",
        width: 60,
      },

      {
        Header: "Dealer",
        Filter: ColumnFilter,
        accessor: "col9",
        width: 120,
      },

      {
        Header: "Created",
        Filter: ColumnFilter,
        accessor: "col10",
        width: 100,
      },

      {
        Header: "Updated",
        Filter: ColumnFilter,
        accessor: "col11",
        width: 100,
      },

      {
        Header: "Connection",
        Filter: ColumnFilter,
        accessor: "col12",
        width: 100,
      },

      {
        Header: "Status",
        Filter: ColumnFilter,
        accessor: "col13",
        width: 140,
        status: "running",
        Cell: ({ cell }) => (
          <span title={cell.row.values.col13 != null ? statusler[Number(cell.row.values.col13)].aciklama : "No Data"} className={cell.row.values.col13 != null ? statusler[Number(cell.row.values.col13)].renk + " row-status" : "row-status"}>
            {
            
            cell.row.values.col13 != null ? statusler[Number(cell.row.values.col13)].title : "No Data" 
            
            }
          </span>
        ),
      },

      {
        Header: "",
        Filter: "",
        accessor: "col14",
        width: 25,
        Cell: ({ cell }) => (
          <div
            className="refresh-button"
            onClick={(e) => {
              getList("/api/dealer/vehicles/?page=" + pageNum, colors);
            }}
          ></div>
        ),
      },

      {
        Header: "",
        Filter: "",
        accessor: "col15",
        width: 25,
        go: false,
        Cell: ({ cell }) => (
          <div
            className="edit-button"
            onClick={(e) => {
              history.push(
                "/add-new-car/?edit=true&id=" + cell.row.original.id
              );
            }}
          ></div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,

    page,

    pageCount,
    gotoPage,

    prepareRow,
    state: { pageIndex, pageSize },
  } = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr key={i} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i2) => (
                <th
                  key={i2}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="datatable-th"
                  style={{ width: column.width, maxWidth: column.width }}
                >
                  {column.render("Header")}
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 8 4"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 2L3 1H5L4 2Z"
                          stroke="black"
                          strokeWidth="2"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 8 4"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 2L5 3L3 3L4 2Z"
                          stroke="black"
                          strokeWidth="2"
                        />
                      </svg>
                    )
                  ) : (
                    ""
                  )}
                  <div>{column.canFilter ? column.render("Filter") : ""}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {isEmpty ? (
            ""
          ) : carList.length == 0 ? (
            <>
              <tr>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
                <td>
                  <div className="skeleton-text-yuksek"></div>
                </td>
              </tr>
            </>
          ) : (
            page.map((row, i3) => {
              prepareRow(row);
              return (
                <tr
                  key={i3}
                  title="Click for details"
                  className="tr-hover"
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell, i) => {
                    return (
                      <td
                        onClick={(e) => {
                          if (i != 14) {
                            history.push("/vehicle-details/" + row.original.id);
                          }
                        }}
                        {...cell.getCellProps()}
                        className="datatable-td"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
        <tbody></tbody>
      </table>

      {isEmpty ? (
        <div className="d-flex justify-content-center">
          <h3>There is no Result for this filter</h3>
        </div>
      ) : (
        ""
      )}

      <div className="emir-pagination">
        {prev == "" ? (
          ""
        ) : (
          <button className="pagi-out" onClick={() => getList(prev, colors)}>
            Previous
          </button>
        )}

        {Array(paginationCount)
          .fill(1)
          .map((val, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  setPageNum(i + 1);
                  getList("/api/dealer/vehicles/?page=" + (i + 1), colors);
                }}
                className={
                  pageNum == i + 1 ? "pagi-num pagi-active" : "pagi-num"
                }
              >
                {i + 1}
              </div>
            );
          })}

        {next == "" ? (
          ""
        ) : (
          <button className="pagi-out" onClick={() => getList(next, colors)}>
            Next
          </button>
        )}
      </div>
    </>
  );
}
