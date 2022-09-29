import React, { Suspense, useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Permalink from "../utils/Permalink";

const Error: NextPage = () => {

  const router = useRouter();
  
  useEffect(() => {
    
    if (!router.isReady) {
      return
    }else{
        const currentPath = router.pathname;
        const currentQuery = {...router.query};
        if(currentQuery?.redirected){
            router.replace(Permalink.ofHomePage())
        }else{
            currentQuery['redirected'] = "1";
            router.replace({
                pathname: currentPath,
                query: currentQuery,
            });
        }        
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
        <h2>Oops!!! Something went wrong.</h2>
    </>
  );
};

export default Error;
