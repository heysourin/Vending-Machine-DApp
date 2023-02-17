import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Navbar from "./Navbar";
import { ethers, utils } from "ethers";
import React, { useState } from "react";
import { abi, VENDING_CONTRACT_ADDRESS } from "constants/constants";
import { useProvider, useSigner, useContract } from "wagmi";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [remainingDonuts, setRemainingDonuts] = useState(""); //keeping track of numbers
  const [restockAmounts, setRestockAmount] = useState(0); //Keeping track of amounts to restock
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const [ownedDonuts, setOwnedDonuts] = useState(""); //tracking owned donuts by a user
  const provider = useProvider();
  const { data: signer, isError, isLoading } = useSigner();
  console.log(signer, isError);

  const contract = useContract({
    address: VENDING_CONTRACT_ADDRESS,
    abi: abi,
    signerOrProvider: signer,
  });

  const getRemainingDonuts = async () => {
    try {
      const remainingDonutBalance = await contract
        .getDonutBalance()
        .then((donut) => {
          return parseInt(donut._hex);
        });
      setRemainingDonuts(remainingDonutBalance);
      console.log(remainingDonutBalance);
    } catch (error) {
      console.error(error);
    }
  };

  const restockDonuts = async (amount) => {
    try {
      const restockMachine = await contract.restock(amount);
      isLoading(true);
      await restockMachine.wait();
      isLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const purchaseDonuts = async (amount) => {
    try {
      const value = amount * 0.01;
      const purchase = await contract.purchase(amount, {
        value: utils.parseEther(value.toString()),
      });
      isLoading: true;
      await purchase.wait();
      isLoading: false;
    } catch (error) {
      console.error(error);
    }
  };

  const getownerDonuts = async () => {
    try {
      const donuts = await contract
        .getOwnedDonuts(signer._address)
        .then((donuts) => {
          return parseInt(donuts._hex);
        });
      setOwnedDonuts(donuts, "Donuts");
      console.log(donuts);
      // await donuts.wait();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRestockAmount = (e) => {
    const getValue = e.target.value;
    const changeTypeValue = parseInt(getValue);
    setRestockAmount(changeTypeValue);
  };

  const handlePurchaseDonuts = (e) => {
    const getValue = e.target.value;
    const changeTypeValue = parseInt(getValue);
    setPurchaseAmount(changeTypeValue);
  };
  return (
    <>
      <Head>
        <title>Vending Machine DApp</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gradient-to-bl from-gray-700 via-gray-900 to-black text-white">
        <Navbar />
        <section className="flex flex-col items-center justify-center transition-all duration-500 dark:w-screen h-screen dark:object-fill bg-cover">
          <div className="flex flex-col items-center rounded-xl justify-center">
            <div className=" w-full flex p-1.5 gap-1 items-center justify-center">
              <div className="flex flex-col p-1.5 gap-1 items-center justify-between m-0">
                <p className="text-2xl text-center">
                  Enter the amounts of Donuts you want
                </p>
                <input
                  className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full "
                  type="number"
                  onChange={handlePurchaseDonuts}
                />
                <button
                  className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                  onClick={() => purchaseDonuts(purchaseAmount)}
                >
                  Purchase
                </button>
                {ownedDonuts && (
                  <div className="text-xl">
                    You have purchased {ownedDonuts} donuts
                  </div>
                )}
              </div>
              <div className="flex flex-col p-1.5 gap-1 items-center justify-between">
                <p className="text-2xl text-center flex flex-col p-1.5 gap-1 items-center justify-center h-full">
                  Restock the Vending Machine
                </p>
                <input
                  type="number"
                  className="outline-none text-center rounded-lg w-5/12 py-2 text-2xl"
                  onChange={handleRestockAmount}
                />
                <button
                  className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  onClick={() => restockDonuts(restockAmounts)}
                >
                  Restock
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-3/6">
              <p className="text-2xl">
                Check the amounts of donuts that you own
              </p>
              <button
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={() => getownerDonuts()}
              >
                Owned donut amounts
              </button>
              {ownedDonuts && (
                <p className="text-2xl">
                  This address owns {ownedDonuts} donuts
                </p>
              )}
              <p className="text-3xl p-1 m-3">Donuts left in the machine</p>
              <button
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={()=>getRemainingDonuts()}
              >
                Donuts remaining
              </button>
              {remainingDonuts && (
                <p className="text-2xl">
                  There are {remainingDonuts} donuts remaining in the machine
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
