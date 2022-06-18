import { GetServerSideProps } from "next";
import React from "react";

const Objekte: React.FC = () => null
    
export const getServerSideProps:GetServerSideProps  = async ({res}) => {
        if(res){
            res.setHeader('Content-Type', 'text/xml')
            res.write(`
                <?xml version="1.0" encoding="UTF-8"?>
                <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`
            )
            res.end()
        }
        return{
            props:{},
        }
    }

export default Objekte