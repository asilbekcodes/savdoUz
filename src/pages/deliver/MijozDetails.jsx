import React, { useEffect, useState } from "react";
import TopBar from "../user/components/TopBar";
import img from "./assets/Frame 427321904.png";
import icon from "./assets/Vector (9).svg";
import Card from "./components/Card";
import Footer from "../user/components/Footer";
import profil from "../user/assets/Vector.svg";
import mijoz from "./assets/Vector (8).svg";
import home from "../user/assets/Vector (3).svg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { httpGetOrderOne, httpUpdateOrder } from "@/services/api/requests/order.request";
import { useParams } from "react-router-dom";
import { Input, Modal } from "antd";
import { handleSuccessNotification } from "@/utils/helpers";
import { httpAddPaymentTrade } from "@/services/api/requests/trade.requests";

const deliverLinks = [
  { to: "/deliver/deliver", label: "Asosiy", icon: home },
  { to: "/deliver/mijozlar", label: "Mijozlar", icon: mijoz },
  { to: "/deliver/profil", label: "Profil", icon: profil },
];

function MijozDetails() {
  const { id } = useParams();
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["mijozId", id],
    queryFn: () => httpGetOrderOne(id),
    select: (response) => response.data,
  });

  const totalSum =
    data?.lead_products?.reduce(
      (sum, item) => sum + item.product.price * item.total_count,
      0
    ) || 0;

  const totalCount =
    data?.lead_products?.reduce((count, item) => count + item.total_count, 0) ||
    0;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const mutation = useMutation({
      mutationFn: httpUpdateOrder,
      onSuccess: () => {
        handleSuccessNotification("Muvaffaqiyatli bajarildi !");
        setIsModalOpen(false);
      },
      onError: (error) => {
        console.log(error);
      }
    })
    const handleStatus = () => {
      const data = {
        id: id, 
        // lead_products: [
        //   {
        //     id: orderProducts[0].id,
        //     total_count: orderProducts[0].count,
        //     company_id: 1,
        //     size_type: "O'lchovsiz",
        //     width: 1,
        //     height: 1,
        //     part_size: 1,
        //     count: orderProducts[0].count,
        //     // product: {
        //     //   id: orderProducts[0].productId,
        //     //   name: orderProducts[0].product,
        //     //   price: orderProducts[0].price
        //     // },
        //     leads: orderId
        //   }
        // ],
        company_id: 1,
        status: "SUCCESS",
        date: new Date().toISOString(),

      }
  
      mutation.mutate({ id: id, data });
    }

    // const [isTulovOpen, setIsTulovOpen] = useState(false);
    // const [tulov, setTulov] = useState(totalSum.toString());
    
    // const mutationTulov = useMutation({
    //   mutationFn: httpAddPaymentTrade,
    //   onSuccess: () => {
    //     handleSuccessNotification("Muvaffaqiyatli bajarildi !");
    //     setIsTulovOpen(false);
    //   },
    //   onError: (error) => {
    //     console.log(error);
    //   }
    // })
    // const handleTulov = () => {
    //   const data = {
    //     cash: tulov,
    //     date:new Date().toISOString(),
    //     trade: "33",
    //     card: 0,
    //     other: 0
    //   }
    //   mutationTulov.mutate( data );
    // }

    // useEffect(() => {
    //   setTulov(totalSum.toString());
    // }, [totalSum]);

  return (
    <div className="p-3">
      <TopBar text={data?.client?.name} />
      <header className="my-4 flex items-center gap-3">
        <img src={icon} alt="" />
        <p className="m-0">Qashqadaryo - {data?.client?.location[0]?.name}</p>
      </header>
      <main className="flex flex-col gap-4">
        {data?.lead_products.length > 0 ? (
          data.lead_products.map((item) => (
            <Card
              key={item.id}
              img={`https://admin.yerqurgon.uz${item.product.image}` || img}
              title={item.product.name}
              location={"Narxi: " + item.product.price + " so'm"}
              soni={
                <>
                  <span className="text-gray-500">Soni:</span>{" "}
                  <span className="text-black">{item.total_count}</span>
                </>
              }
            />
          ))
        ) : (
          <p>Mahsulot mavjud emas</p>
        )}
        {/* <div className="block md:hidden">
          <button onClick={() => setIsModalOpen(true)} className="flex items-center justify-center gap-2 w-full text-lg p-3 mb-20 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Yetkazildi
          </button>
        </div> */}
      </main>
      <div className="fixed bottom-16 rounded-t-xl left-0 right-0 bg-white border-t border-gray-300 shadow-md z-50 py-2 block md:hidden">
        <div className="flex justify-between py-2 px-3 text-sm ">
          <div>
            <p className="m-0 text-gray-700 text-[12px]">Mahsulot:({totalCount})</p>
            <span className="text-[20px] text-black">
            {totalSum.toLocaleString()} so'm
            </span>
          </div>
          <button disabled={data?.status === "PENDING" || data?.status === "SUCCESS" || data?.status === "FAILED" } onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white p-2 rounded-lg text-center disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed">
            Mahsulot yetkazildi
          </button>
        </div>
      </div>
      <Modal
        okText="Ha, yetkazildi"
        open={isModalOpen}
        onOk={handleStatus}
        okButtonProps={{
          style: {
            backgroundColor: "#1D61E7",
            color: "#fff",
            border: "none",
            width: "100%",
            height: "40px",
            borderRadius: "5px",
            position: "relative",
            left: "-5px",
          },
        }}
        cancelButtonProps={{ style: { display: "none" } }}
        centered
        width={400}
        onCancel={() => setIsModalOpen(false)}
        styles={{
          body: {
            textAlign: "center",
            borderRadius: "10px",
            paddingBottom: "20px",
          },
        }}
      >
        <h4 style={{ fontSize: "20px", marginBottom: "10px", marginTop: "20px" }}>
          Siz mahsulotlarni yetkazib berdingizmi?
        </h4>
      </Modal>

      {/* <Modal
        okText="To'lovni qilish"
        open={isTulovOpen}
        onOk={handleTulov}
        okButtonProps={{
          style: {
            backgroundColor: "#1D61E7",
            color: "#fff",
            border: "none",
            width: "100%",
            height: "40px",
            borderRadius: "5px",
            position: "relative",
            left: "-5px",
          },
        }}
        cancelButtonProps={{ style: { display: "none" } }}
        centered
        width={400}
        onCancel={() => setIsTulovOpen(false)}
        styles={{
          body: {
            textAlign: "center",
            borderRadius: "10px",
            paddingBottom: "20px",
          },
        }}
      >
        <h4 style={{ fontSize: "20px", marginBottom: "20px", marginTop: "20px" }}>
          To'lovni qabul qilish
        </h4>
        <Input
          // defaultValue={`${totalSum.toLocaleString()}`}
          value={tulov}
          onChange={(e) => setTulov(e.target.value)}
          placeholder="To'lov summasini kiriting"
          style={{
            height: "40px",
            borderRadius: "5px",
            border: "1px solid #ddd",
          }}
        />
      </Modal> */}
      <Footer links={deliverLinks} />
    </div>
  );
}

export default MijozDetails;
