import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import Lineage from "@/components/Lineage";
import Ownership from "@/components/Ownership";
import Spend from "@/components/Spend";
import Router from "@/components/Router";
import Setup from "@/components/Setup";
import Ask from "@/components/Ask";
import Permissions from "@/components/Permissions";
import SiteFooter from "@/components/SiteFooter";
import SiteBehavior from "@/components/SiteBehavior";

export default function Page() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <SiteHeader />

      <main id="main">
        <Hero />
        <Lineage />
        <Ownership />
        <Spend />
        <Router />
        <Setup />
        <Ask />
        <Permissions />
      </main>

      <SiteFooter />
      <SiteBehavior />
    </>
  );
}
