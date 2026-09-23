import { BlogArticleData, BlogMeta } from "@/types/blog-article";
import { whatIsEndToEndBlog } from "./what-is-end-to-end-product-engineering";
import { physicalProductBlog } from "./how-to-develop-a-physical-product-from-idea-to-manufacturing";
import { indiaProductEngineeringBlog } from "./product-engineering-company-in-india";
import { customAutomatedMachineBlog } from "./how-to-build-a-custom-automated-machine";
import { mechanicalElectronicsEmbeddedBlog } from "./mechanical-electronics-embedded-product-development";
import { prototypeVsProductionBlog } from "./prototype-vs-production-what-changes";
import { howToDesignIndustrialMachineBlog } from "./how-to-design-an-industrial-machine";
import { howToDevelopCustomPcbBlog } from "./how-to-develop-a-custom-pcb-for-an-industrial-machine";
import { howEmbeddedFirmwareControlsBlog } from "./how-embedded-firmware-controls-an-automated-machine";
import { howToDesignIndustrialHmiBlog } from "./how-to-design-an-industrial-hmi";
import { howToIntegratePaymentBlog } from "./how-to-integrate-payment-into-a-physical-machine";
import { industrialAutomationProductDevelopmentBlog } from "./industrial-automation-product-development";
import { fromCadToManufacturingBlog } from "./from-cad-to-manufacturing-product-engineering-workflow";
import { ip65EnclosureDesignBlog } from "./ip65-enclosure-design";
import { pcbAndEnclosureMechanicalDesignBlog } from "./pcb-and-enclosure-mechanical-design";
import { canBusVsRs485VsUartBlog } from "./can-bus-vs-rs485-vs-uart";
import { otaUpdatesForIndustrialMachinesBlog } from "./ota-updates-for-industrial-machines";
import { remoteMonitoringForIndustrialMachinesBlog } from "./remote-monitoring-for-industrial-machines";

export const allBlogs: BlogArticleData[] = [
  whatIsEndToEndBlog,
  physicalProductBlog,
  indiaProductEngineeringBlog,
  customAutomatedMachineBlog,
  mechanicalElectronicsEmbeddedBlog,
  prototypeVsProductionBlog,
  howToDesignIndustrialMachineBlog,
  howToDevelopCustomPcbBlog,
  howEmbeddedFirmwareControlsBlog,
  howToDesignIndustrialHmiBlog,
  howToIntegratePaymentBlog,
  industrialAutomationProductDevelopmentBlog,
  fromCadToManufacturingBlog,
  ip65EnclosureDesignBlog,
  pcbAndEnclosureMechanicalDesignBlog,
  canBusVsRs485VsUartBlog,
  otaUpdatesForIndustrialMachinesBlog,
  remoteMonitoringForIndustrialMachinesBlog,
];

export function getBlogArticleBySlug(slug: string): BlogArticleData | undefined {
  return allBlogs.find((blog) => blog.meta.slug === slug);
}

export function getAllBlogMetas(): BlogMeta[] {
  return allBlogs.map((b) => b.meta);
}

export function getAdjacentBlogs(slug: string): {
  prev?: { title: string; slug: string };
  next?: { title: string; slug: string };
} {
  const index = allBlogs.findIndex((b) => b.meta.slug === slug);
  if (index === -1) return {};

  return {
    prev: index > 0 ? { title: allBlogs[index - 1].meta.title, slug: allBlogs[index - 1].meta.slug } : undefined,
    next:
      index < allBlogs.length - 1
        ? { title: allBlogs[index + 1].meta.title, slug: allBlogs[index + 1].meta.slug }
        : undefined,
  };
}
