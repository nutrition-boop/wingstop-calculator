"use strict";(()=>{var e={};e.id=628,e.ids=[628],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},70688:(e,t,s)=>{s.r(t),s.d(t,{originalPathname:()=>u,patchFetch:()=>c,requestAsyncStorage:()=>m,routeModule:()=>p,serverHooks:()=>d,staticGenerationAsyncStorage:()=>l});var a={};s.r(a),s.d(a,{GET:()=>o});var i=s(49303),r=s(88716),n=s(60670);async function o(){let e=process.env.NEXT_PUBLIC_BASE_URL||"https://wingstopcaloriecalculator.us";return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${e}/sitemap_general.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${e}/sitemap_locations.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
</sitemapindex>`,{headers:{"Content-Type":"application/xml"}})}let p=new i.AppRouteRouteModule({definition:{kind:r.x.APP_ROUTE,page:"/sitemap_index.xml/route",pathname:"/sitemap_index.xml",filename:"route",bundlePath:"app/sitemap_index.xml/route"},resolvedPagePath:"C:\\vibe\\wingstop\\src\\app\\sitemap_index.xml\\route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:m,staticGenerationAsyncStorage:l,serverHooks:d}=p,u="/sitemap_index.xml/route";function c(){return(0,n.patchFetch)({serverHooks:d,staticGenerationAsyncStorage:l})}},49303:(e,t,s)=>{e.exports=s(30517)}};var t=require("../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),a=t.X(0,[948],()=>s(70688));module.exports=a})();