import React, { useEffect, useState } from "react";
import LayoutComp from "../../components/Core/LayoutComp";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Badge from "../../components/UI/Badge";
import Table from "../../components/Core/Table/Table";
import { Icon } from "@iconify/react";
import { approveSeller, blockSeller, deleteSeller, getActiveSellers, getApprovedSellersCount, getBlockedSellers, getDeletedSellers, getPendingSellers, getSellers, getSellersCount, getSellersCount7Days, getSuspendedSellers, getUnApprovedSellersCount, suspendSeller } from "../../Services/seller.service";
import { parseStatus, parseStatusColor } from "../../Utils/status";
import { ITableCol } from "../../components/Core/Table/types";
import Action from "../../components/UI/Action";
import { IAction } from "../../types/types";

interface IStat {
  unapproved_sellers: number;
  approved_sellers: number;
  new_sellers_last_7_days: number;
  total_sellers: number;
}

interface ISeller {
  id: string;
  name: string,
  status: string,
  business_type: string,
  date_registered: string,
  total_listed_items: number,
  total_products_sold: number

}

const Sellers = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<number>(1)
  const [updateStatus, setUpdateStatus] = useState<boolean>(false);
  const [sellers, setSellers] = useState<any[]>([])
  const [stat, setStat] = useState<IStat>({} as IStat)
  const [badgeData, setBadgeData] = useState<any[]>([])
  const [totalSellersCount, setTotalSellersCount] = useState<number>(0);
  const [last7DaysCount, setLast7DaysCount] = useState<number>(0);
  const [approvedSellersCount, setApprovedSellersCount] = useState<number>(0);
  const [unApprovedSellersCount, setUnApprovedSellersCount] = useState<number>(0);
  const [rowData, setRowData] = useState<any>([])


  const handleRowClick = (id: string | number) => {
    // const sellerId = params.row.id;
    console.log(id);
    navigate(`/sellers/${id}`);
  };
  const handleTabChange = (index: number) => {
    setActiveTab(index)

  }

  function myFunc(id: string) {
    console.log("approve: ", id)
  }

  const ActionObj: IAction[] = [
    {
      action: "Approve",
      api: (id: string) => {
        approveSeller(id).then((res: any) => {
          console.log(res)
          setUpdateStatus(!updateStatus)
        }).catch((err: any) => {
          console.log(err)
        })
      }
    },
    {
      action: "Block",
      api: (id: string) => {
        blockSeller(id).then((res: any) => {
          console.log(res)
          setUpdateStatus(!updateStatus)
        }).catch((err: any) => {
          console.log(err)
        })
      }
    },
    {
      action: "Suspend",
      api: (id: string) => {
        suspendSeller(id).then((res: any) => {
          console.log(res)
          setUpdateStatus(!updateStatus)
        }).catch((err: any) => {
          console.log(err)
        })
      }
    },
    {
      action: "Delete",
      api: (id: string) => {
        deleteSeller(id).then((res: any) => {
          console.log(res)
          setUpdateStatus(!updateStatus)
        }).catch((err: any) => {
          console.log(err)
        })
      }

    }
  ]

  useEffect(() => {
    if (activeTab === 1) {
      getSellers().then((response: any) => {
        console.log(response);
        const sellers: ISeller[] = response.data.map((seller: any, index: number) => {
          return {
            id: seller.id,
            name: seller.name,
            status: seller.status,
            business_type: seller.business_type,
            date_registered: seller.date_registered,
            total_listed_items: seller.total_listed_items,
            total_products_sold: seller.total_products_sold
          }
        });
        setSellers(sellers)
      })
    }

    if (activeTab === 2) {
      getPendingSellers().then((response: any) => {
        console.log(response);
        const sellers: ISeller[] = response.data.map((seller: any, index: number) => {
          return {
            id: seller.id,
            name: seller.name,
            status: seller.status,
            business_type: seller.business_type,
            date_registered: seller.date_registered,
            total_listed_items: seller.total_listed_items,
            total_products_sold: seller.total_products_sold
          }
        });
        setSellers(sellers)
      })
    }

    if (activeTab === 3) {
      getActiveSellers().then((response: any) => {
        console.log(response);
        const sellers: ISeller[] = response.data.map((seller: any, index: number) => {
          return {
            id: seller.id,
            name: seller.name,
            status: seller.status,
            business_type: seller.business_type,
            date_registered: seller.date_registered,
            total_listed_items: seller.total_listed_items,
            total_products_sold: seller.total_products_sold
          }
        });
        setSellers(sellers)
      })
    }

    if (activeTab === 4) {
      getBlockedSellers().then((response: any) => {
        console.log(response);
        const sellers: ISeller[] = response.data.map((seller: any, index: number) => {
          return {
            id: seller.id,
            name: seller.name,
            status: seller.status,
            business_type: seller.business_type,
            date_registered: seller.date_registered,
            total_listed_items: seller.total_listed_items,
            total_products_sold: seller.total_products_sold
          }
        });
        setSellers(sellers)
      })
    }

    if (activeTab === 5) {
      getSuspendedSellers().then((response: any) => {
        console.log(response);
        const sellers: ISeller[] = response.data.map((seller: any, index: number) => {
          return {
            id: seller.id,
            name: seller.name,
            status: seller.status,
            business_type: seller.business_type,
            date_registered: seller.date_registered,
            total_listed_items: seller.total_listed_items,
            total_products_sold: seller.total_products_sold
          }
        });
        setSellers(sellers)
      })
    }

    if (activeTab === 6) {
      getDeletedSellers().then((response: any) => {
        console.log(response);
        const sellers: ISeller[] = response.data.map((seller: any, index: number) => {
          return {
            id: seller.id,
            name: seller.name,
            status: seller.status,
            business_type: seller.business_type,
            date_registered: seller.date_registered,
            total_listed_items: seller.total_listed_items,
            total_products_sold: seller.total_products_sold
          }
        });
        setSellers(sellers)
      })
    }

    if (activeTab === 1) {
      getSellers().then((response: any) => {
        console.log(response);
        const sellers: ISeller[] = response.data.map((seller: any, index: number) => {
          return {
            id: seller.id,
            name: seller.name,
            status: seller.status,
            business_type: seller.business_type,
            date_registered: seller.date_registered,
            total_listed_items: seller.total_listed_items,
            total_products_sold: seller.total_products_sold
          }
        });
        setSellers(sellers)
      })
    }

    if (activeTab === 1) {
      getSellers().then((response: any) => {
        console.log(response);
        const sellers: ISeller[] = response.data.map((seller: any, index: number) => {
          return {
            id: seller.id,
            name: seller.name,
            status: seller.status,
            business_type: seller.business_type,
            date_registered: seller.date_registered,
            total_listed_items: seller.total_listed_items,
            total_products_sold: seller.total_products_sold
          }
        });
        setSellers(sellers)
      })
    }

  }, [activeTab, updateStatus])

  useEffect(() => {
    console.log(sellers)
    const rowData = sellers.map((data, index) => {
      return {
        id: data.id,
        name: <p className="text-[13px] font-medium">{data.name}</p>,
        status: <p className={`text-[${parseStatusColor(data.status)}] text-[13px]`}>{data.status}</p>,
        business_type: <p className="text-[#555F7E] text-[13px]">{data.business_type}</p>,
        date_registered: <p className="text-[#555F7E] text-[13px]">{data.date_registered}</p>,
        total_listed_items: <p className="text-[#555F7E] text-[13px]">{data.total_listed_items}</p>,
        total_products_sold: <p className="text-[#555F7E] text-[13px]">{data.total_products_sold}</p>,
        action: <Action actions={ActionObj} id={data.id} />

      }
    })
    setRowData(rowData);
  }, [sellers])

  const headers: ITableCol[] = [
    { field: 'name', headerName: 'Seller Name' },
    { field: 'status', headerName: 'Status' },
    { field: 'business_type', headerName: 'Business Type' },
    { field: 'date_registered', headerName: 'Date Registered' },
    { field: 'total_listed_items', headerName: 'Total Listed Items' },
    { field: 'total_products_sold', headerName: 'Total Sales Made' },
    { field: 'action', headerName: 'Action' },

  ]
  useEffect(() => {
    getSellers().then((response: any) => {
      console.log(response);
      const sellers: ISeller[] = response.data.map((seller: any, index: number) => {
        return {
          id: seller.id,
          name: seller.name,
          status: seller.status,
          business_type: seller.business_type,
          date_registered: seller.date_registered,
          total_listed_items: seller.total_listed_items,
          total_products_sold: seller.total_products_sold
        }
      });
      setSellers(sellers)
    })


    getSellersCount().then((res: any) => {
      setTotalSellersCount(res.data.total_sellers)
    })

    getSellersCount7Days().then((res: any) => {
      setLast7DaysCount(res.data.new_sellers_last_7_days)
    })

    getApprovedSellersCount().then((res: any) => {
      setApprovedSellersCount(res.data.approved_sellers)
    })

    getUnApprovedSellersCount().then((res: any) => {
      setUnApprovedSellersCount(res.data.unapproved_sellers)
    })
  }, [])

  useEffect(() => {
    const badgeData = [
      {
        id: 1,
        number: totalSellersCount,
        image: (
          <Icon
            icon="entypo:bar-graph"
            color="#d65d5b"
            width={18}
            height={18}
          />
        ),
        title: "Total Sellers",
      },
      {
        id: 2,
        number: last7DaysCount,
        image: (
          <Icon
            icon="entypo:bar-graph"
            color="#d65d5b"
            width={18}
            height={18}
          />
        ),
        title: "Total sellers in past 7 days",
      },
      {
        id: 3,
        number: totalSellersCount,
        image: (
          <Icon
            icon="entypo:bar-graph"
            color="#d65d5b"
            width={18}
            height={18}
          />
        ),
        title: "Total sellers in past 30 days",
      },
      {
        id: 4,
        number: approvedSellersCount,
        image: (
          <Icon
            icon="entypo:bar-graph"
            color="#d65d5b"
            width={18}
            height={18}
          />
        ),
        title: "Total approved sellers",
      },
      {
        id: 5,
        number: unApprovedSellersCount,
        image: (
          <Icon
            icon="entypo:bar-graph"
            color="#d65d5b"
            width={18}
            height={18}
          />
        ),
        title: "Total unapproved sellers",
      },
    ];

    setBadgeData(badgeData)
  }, [totalSellersCount, last7DaysCount, unApprovedSellersCount, approvedSellersCount])



  return (
    <>
      <LayoutComp title={"Manage sellers"}>
        <div className="flex flex-col gap-4 bg-[#F5F5F5]">
          <div className="flex flex-row items-center gap-4 mt-4">
            {
              badgeData.map((data, index) => (
                <Badge key={data.id} title={data.title} number={data.number} image={data.image} className={'text-[9px]'} />
              ))
            }
          </div>
          <div className="flex justify-center gap-8 items-center w-[50%]">
            <input className="border w-[60%] border-[#B3B7BB] rounded-2xl placeholder:text-center placeholder:text-xs placeholder:text-[#B3B7BB] placeholder:font-bold py-3 bg-[transparent]" type="text" placeholder="Search" />
            <button className="py-[15px] w-[40%] bg-[#D65D5B] text-[#fff] text-xs text-center rounded-2xl font-bold">Search</button>
          </div>
          <div className="flex flex-col items-start gap-6 px-3 py-5 bg-white rounded-3xl">
            <div className="flex items-end gap-6">
              <div onClick={() => handleTabChange(1)} className={`flex hover:cursor-pointer items-end pb-1 text-sm gap-2 font-bold ${activeTab === 1 ? 'text-[#0F60FF] border-b-[3px] border-b-[#0F60FF]' : 'text-[#D0D0D0]'}`}>
                <p>All</p>
              </div>
              <div onClick={() => handleTabChange(2)} className={`flex hover:cursor-pointer items-end pb-1 text-sm gap-2 font-bold ${activeTab === 2 ? 'text-[#0F60FF] border-b-[3px] border-b-[#0F60FF]' : 'text-[#D0D0D0]'}`}>
                <p>Pending</p>
              </div>
              <div onClick={() => handleTabChange(3)} className={`flex hover:cursor-pointer items-end pb-1 text-sm gap-2 font-bold ${activeTab === 3 ? 'text-[#0F60FF] border-b-[3px] border-b-[#0F60FF]' : 'text-[#D0D0D0]'}`}>
                <p>Approved</p>
              </div>
              <div onClick={() => handleTabChange(5)} className={`flex hover:cursor-pointer items-end pb-1 text-sm gap-2 font-bold ${activeTab === 5 ? 'text-[#0F60FF] border-b-[3px] border-b-[#0F60FF]' : 'text-[#D0D0D0]'}`}>
                <p>Blocked</p>
              </div>
              <div onClick={() => handleTabChange(6)} className={`flex hover:cursor-pointer items-end pb-1 text-sm gap-2 font-bold ${activeTab === 6 ? 'text-[#0F60FF] border-b-[3px] border-b-[#0F60FF]' : 'text-[#D0D0D0]'}`}>
                <p>Suspended</p>
              </div>
              <div onClick={() => handleTabChange(7)} className={`flex hover:cursor-pointer items-end pb-1 text-sm gap-2 font-bold ${activeTab === 7 ? 'text-[#0F60FF] border-b-[3px] border-b-[#0F60FF]' : 'text-[#D0D0D0]'}`}>
                <p>Deleted</p>
              </div>
            </div>
            <Table headers={headers} headerStyle={'text-xs'} data={rowData} onClick={handleRowClick} />
          </div>

          {/* <div className="bg-[white]">
            <DataGrid rows={rows} columns={columns} onRowClick={handleRowClick} className="cursor-pointer"/>
          </div> */}
        </div>
      </LayoutComp>
    </>
  );
};

export default Sellers;
