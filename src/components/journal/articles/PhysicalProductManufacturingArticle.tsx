"use client";

import React from "react";
import {
  P,
  Span,
  H2,
  JournalUL,
  JournalOL,
  LI,
  JournalCallout,
  JournalQuote,
  JournalTakeaways,
  JournalDivider,
  JournalFaq,
  JournalRelated,
  Table,
  THead,
  TBody,
  TR,
  TH,
  TD,
} from "@/components/journal/JournalComponents";
import { JournalPostMeta } from "@/types/journal";
import { FaqItem } from "@/components/journal/JournalFaq";

export const tocPhysicalProduct = [
  { id: "first-dont-build", text: "First, Don't Build the Product" },
  { id: "turn-idea-into-evaluation", text: "Turn the Idea Into Something Evaluatable" },
  { id: "design-industrial-engineering", text: "Design: Industrial Design Meets Engineering" },
  { id: "prototype-early-cheaply", text: "Prototype Early. Prototype Cheaply." },
  { id: "first-prototype-wrong", text: "Your First Prototype Will Probably Be Wrong" },
  { id: "test-like-customer", text: "Test the Product Like a Customer, Not Its Parent" },
  { id: "intellectual-property", text: "Don't Forget Intellectual Property" },
  { id: "talking-about-manufacturing", text: "Now We Can Talk About Manufacturing" },
  { id: "finding-right-factory", text: "Finding the Right Factory" },
  { id: "understand-economics", text: "Understand the Full Economics Before Ordering" },
  { id: "production-standard", text: "Production: The Prototype Is Now the Standard" },
  { id: "quality-control", text: "Quality Control: Trust Is Great. Inspection Is Better." },
  { id: "shipping-logistics", text: "Shipping & International Logistics" },
  { id: "five-costly-mistakes", text: "The Five Mistakes I See Most Often" },
  { id: "where-to-start", text: "The 10-Step Practical Starting Guide" },
  { id: "idea-to-factory", text: "From Idea to Factory Isn't One Big Leap" },
  { id: "faq", text: "Frequently Asked Questions" },
];

const faqs: FaqItem[] = [
  {
    question: "How do I know if my physical product is ready for mass manufacturing?",
    answer:
      "A product is ready for tooling and production when you have: 1) Proven market demand with pre-orders or user validation, 2) Completed a functional prototype tested in real conditions, 3) Performed a comprehensive DFM review with CAD tolerances verified, and 4) Confirmed your full landed unit economics leave a healthy margin.",
  },
  {
    question: "What is Design for Manufacturability (DFM) and why is it critical?",
    answer:
      "DFM is the engineering practice of designing components so they are easy, cost-effective, and consistent to produce using specific manufacturing methods (injection molding, CNC, sheet metal, casting, or SMT). Fixing a design flaw in CAD costs a few hours; fixing it after steel molds are cut can cost tens of thousands of dollars.",
  },
  {
    question: "What is the difference between factory unit price and landed cost?",
    answer:
      "Factory price is solely what the manufacturer charges to assemble the item at their gate (EXW/FOB). Landed cost includes factory price plus tooling amortisation, custom packaging, ocean/air freight, insurance, customs tariffs, import duties, warehousing, quality inspections, and domestic fulfillment.",
  },
  {
    question: "When should I file for patents or protect intellectual property?",
    answer:
      "Before publicly disclosing your product (on Kickstarter, social media, or public expos) and before sending non-confidential CAD files to unvetted factories. Consider non-disclosure agreements (NDAs) and discuss provisional patents or design registrations with legal counsel early.",
  },
  {
    question: "How do I prevent receiving thousands of defective units from overseas?",
    answer:
      "Establish strict objective golden samples and quantitative tolerance documents. Implement multi-stage Quality Control: pre-production material checks, during-production inspection (DUPRO), and pre-shipment inspection (PSI) by qualified third-party inspectors before final payments are released.",
  },
];

export function PhysicalProductManufacturingArticle({ post }: { post: JournalPostMeta }) {
  return (
    <>
      <P lead>
        You have an idea for a physical product. Maybe you sketched it on the back of a notebook. Maybe you drew it during a meeting you were supposed to be paying attention to. Maybe you have had the idea for three years and keep telling yourself, <Span variant="bold">“One day, I’m going to build this.”</Span>
      </P>

      <P>
        And now you&apos;ve decided that one day is today. Naturally, the next question is: <Span variant="italic">“How do I actually turn this idea into a real product?”</Span>
      </P>

      <P>
        This is where things get interesting. Because unlike software, you can&apos;t really ship a cardboard box with a “beta” label on it and ask customers to forgive you for the missing corners.
      </P>

      <P>
        Physical products have materials. Tooling. Tolerances. Suppliers. Manufacturing constraints. Shipping. Certifications. Minimum order quantities. Inventory. Packaging. Margins. And every one of those things eventually sends you an invoice.
      </P>

      <JournalCallout variant="science" title="The Realistic Manufacturing Path">
        <Span variant="bold">Idea → Validation → Product Definition → Design → Prototype → Testing → DFM → Factory → Production → Quality Control → Shipping → Market</Span>
      </JournalCallout>

      <H2 id="first-dont-build">First, Don&apos;t Build the Product</H2>

      <P>
        I know. You came here to learn how to build a product, and I&apos;m already telling you not to build it. But this is probably the most important advice I can give: <Span variant="bold">Before you spend serious money making something, find out whether people actually want it.</Span>
      </P>

      <P>
        Your enthusiasm is not market validation. Neither is your friend&apos;s response of: <Span variant="italic">“Oh, I&apos;d definitely buy that.”</Span> Friends are wonderful. They are not a market research department.
      </P>

      <P>Before thinking about factories, materials, or packaging, answer a few uncomfortable questions:</P>

      <JournalUL>
        <LI>Who exactly has this problem?</LI>
        <LI>How frequently do they experience it?</LI>
        <LI>What are they using today?</LI>
        <LI>Why isn&apos;t the existing solution good enough?</LI>
        <LI>What would make someone switch?</LI>
        <LI>What would they realistically pay?</LI>
        <LI>Can you manufacture the product at a cost that leaves you with a viable business?</LI>
      </JournalUL>

      <JournalQuote author="Hanish Jyosyabhatla">
        You can build an amazing product that costs $40 to manufacture and discover that customers only want to pay $45 for it. Technically, you have a product. Financially, you have a hobby.
      </JournalQuote>

      <H2 id="turn-idea-into-evaluation">Turn the Idea Into Something Someone Can Actually Evaluate</H2>

      <P>
        Write a clear product brief. Not a 47-page business plan, but explicit definitions:
      </P>

      <JournalUL>
        <LI><Span variant="bold">The Problem &amp; User:</Span> Who is using it and under what physical conditions?</LI>
        <LI><Span variant="bold">Core Function:</Span> What is essential vs. merely nice-to-have?</LI>
        <LI><Span variant="bold">Physical Constraints:</Span> Target dimensions, weight limits, environmental exposure.</LI>
        <LI><Span variant="bold">Unit Economics:</Span> Target retail price and maximum allowable unit cost.</LI>
        <LI><Span variant="bold">Regulatory &amp; Compliance:</Span> CE, FCC, RoHS, UL, or regional safety testing.</LI>
        <LI><Span variant="bold">Expected Volume:</Span> Initial pilot of 500 units vs. mass scale of 50,000.</LI>
      </JournalUL>

      <H2 id="design-industrial-engineering">Design: Where the Sketch Starts Becoming a Product</H2>

      <P>
        This is where industrial design and engineering come together. Industrial design considers form, ergonomics, colors, and aesthetics. Engineering considers mechanical strength, assembly tolerances, component interactions, and thermal dissipation.
      </P>

      <JournalCallout variant="warning" title="Design for Manufacturability (DFM)">
        A product may work perfectly as a hand-crafted prototype and still be impossible to mold or assemble at scale. Fixing a geometry conflict in 3D CAD is a simple conversation. Fixing it after steel tooling is cut is a five-figure mistake.
      </JournalCallout>

      <H2 id="prototype-early-cheaply">Prototype Early. Prototype Cheaply.</H2>

      <P>
        Your first prototype does not need to be beautiful. It needs to answer questions. Can someone hold it comfortably? Does the mechanism operate smoothly? Do the parts fit?
      </P>

      <P>
        Use cardboard, foam, 3D printing (FDM/SLA), CNC machining, or off-the-shelf electronics. Every prototype should exist solely to eliminate a specific unknown.
      </P>

      <H2 id="first-prototype-wrong">Your First Prototype Will Probably Be Wrong</H2>

      <P>
        The first prototype is not your baby—it is evidence. Put it in front of real users and watch them without coaching them. If you have to say <Span variant="italic">“No, turn that first, then press,”</Span> you have just uncovered a critical design flaw.
      </P>

      <H2 id="test-like-customer">Test the Product Like a Customer, Not Its Parent</H2>

      <P>
        Try to break your prototype. Drop it. Overheat it. Cycle the hinges 5,000 times. Abuse it the way distracted customers with children or demanding factory operators will. If something fails, celebrate: you found it before your customer did.
      </P>

      <H2 id="intellectual-property">Don&apos;t Forget Intellectual Property</H2>

      <P>
        If your product contains genuinely novel mechanisms or proprietary technology, evaluate patent and design protection before public disclosure. A thin provisional patent filed without clear claims provides false security—seek experienced patent counsel early.
      </P>

      {/* Comparison Table */}
      <Table caption="Table 1: Prototype Phase vs. Scaled Production Phase">
        <THead>
          <TR>
            <TH>Aspect</TH>
            <TH>Prototype Phase</TH>
            <TH>Production Phase</TH>
          </TR>
        </THead>
        <TBody>
          <TR>
            <TD variant="bold">Goal</TD>
            <TD>Answer questions &amp; prove feasibility</TD>
            <TD variant="mint">Repeatable, defect-free unit volume</TD>
          </TR>
          <TR>
            <TD variant="bold">Manufacturing Method</TD>
            <TD>3D printing, hand assembly, CNC</TD>
            <TD variant="mint">Injection molding, stamping, automated SMT</TD>
          </TR>
          <TR>
            <TD variant="bold">Unit Cost</TD>
            <TD>High per-unit cost ($100s–$1000s)</TD>
            <TD variant="mint">Optimized landed cost ($5–$30)</TD>
          </TR>
          <TR>
            <TD variant="bold">Upfront Capital</TD>
            <TD>Low material &amp; machine time expense</TD>
            <TD variant="mint">High tooling, molds, and MOQ commitments</TD>
          </TR>
          <TR>
            <TD variant="bold">Tolerance Control</TD>
            <TD>Hand-fitted by engineers</TD>
            <TD variant="mint">Strict geometric dimensioning &amp; tolerancing (GD&amp;T)</TD>
          </TR>
        </TBody>
      </Table>

      <H2 id="talking-about-manufacturing">Now We Can Talk About Manufacturing</H2>

      <P>
        Mass manufacturing shifts the question from <Span variant="italic">“Can we make one?”</Span> to <Span variant="bold">“Can we produce 5,000 of these consistently, with under 1% defect rate, at our target profit margin?”</Span>
      </P>

      <H2 id="finding-right-factory">Finding the Right Factory</H2>

      <P>
        A factory that quotes 15% cheaper but produces 20% defective units is not cheaper. It is an operational catastrophe. Vet factory capabilities, verify past client references, review their on-site quality certifications (ISO 9001, IATF 16949), and conduct on-site or third-party audits before wiring deposits.
      </P>

      <H2 id="understand-economics">Understand the Full Economics Before Ordering</H2>

      <P>
        Your factory quotation is not your landed cost. You must budget for:
      </P>

      <JournalUL>
        <LI>Tooling &amp; Mold Fabrication</LI>
        <LI>Custom Packaging &amp; Barcode Labeling</LI>
        <LI>Ocean/Air Freight &amp; Port Fees</LI>
        <LI>Import Customs, Duties, &amp; Tariffs</LI>
        <LI>Third-Party Quality Inspections</LI>
        <LI>Warehousing &amp; Pick-Pack Fulfillment</LI>
        <LI>Payment Processing &amp; Returns Reserve</LI>
      </JournalUL>

      <H2 id="production-standard">Production: The Prototype Is Now the Standard</H2>

      <P>
        Never accept vague promises like <Span variant="italic">“make it like the sample.”</Span> Document exact Pantone colors, surface texture finishes (SPI/VDI standards), mechanical tolerances, functional test pass criteria, and defective rejection thresholds in a formal Manufacturing Agreement.
      </P>

      <H2 id="quality-control">Quality Control: Trust Is Great. Inspection Is Better.</H2>

      <P>
        Conduct inspection across three distinct gates:
      </P>

      <JournalOL>
        <LI><Span variant="bold">Pre-Production Inspection:</Span> Validate raw materials, master batches, and electronic component batches.</LI>
        <LI><Span variant="bold">During Production (DUPRO):</Span> Inspect early units directly on the assembly line to catch tooling alignment or soldering issues before the full run finishes.</LI>
        <LI><Span variant="bold">Pre-Shipment Inspection (PSI):</Span> Statistically sample packaged boxes using AQL (Acceptable Quality Limit) standards before approving final wire payments.</LI>
      </JournalOL>

      <H2 id="shipping-logistics">Shipping &amp; International Logistics</H2>

      <P>
        International freight has its own vocabulary (Incoterms, FOB, DDP, CIF, HS Codes). Partner with experienced freight forwarders, ensure proper cargo insurance, and verify destination compliance certifications before containers leave port.
      </P>

      <H2 id="five-costly-mistakes">The Five Mistakes I See Most Often</H2>

      <JournalOL>
        <LI><Span variant="bold">Building before validating</Span> customer demand.</LI>
        <LI><Span variant="bold">Designing without manufacturing constraints</Span> (ignoring draft angles, wall thickness, and assembly access).</LI>
        <LI><Span variant="bold">Selecting the cheapest factory</Span> solely on paper price.</LI>
        <LI><Span variant="bold">Ignoring landed cost realities</Span> (freight, packaging, tariffs, returns).</LI>
        <LI><Span variant="bold">Treating a prototype as a production-ready design.</Span></LI>
      </JournalOL>

      <H2 id="where-to-start">The 10-Step Practical Starting Guide</H2>

      <JournalOL>
        <LI><Span variant="bold">Define the problem</Span> and pain point severity.</LI>
        <LI><Span variant="bold">Validate the market</Span> with real prospective buyers.</LI>
        <LI><Span variant="bold">Document requirements</Span> in a clear Product Brief.</LI>
        <LI><Span variant="bold">Build the cheapest rough prototype</Span> (cardboard/foam/3D print).</LI>
        <LI><Span variant="bold">Evaluate intellectual property</Span> options before disclosure.</LI>
        <LI><Span variant="bold">Engineer a functional prototype</Span> to prove physics and electronics.</LI>
        <LI><Span variant="bold">Put it in users&apos; hands</Span> and iterate out friction.</LI>
        <LI><Span variant="bold">Perform complete DFM engineering</Span> for tooling readiness.</LI>
        <LI><Span variant="bold">Vet and audit manufacturers</Span> with rigorous sample approvals.</LI>
        <LI><Span variant="bold">Run controlled pilot production</Span> with comprehensive inspection.</LI>
      </JournalOL>

      <H2 id="idea-to-factory">From Idea to Factory Isn&apos;t One Big Leap</H2>

      <P>
        Physical product development rewards patience at the beginning because mistakes become exponentially more expensive as you move downstream. A sketch is free to change. A 3D model is cheap. A prototype is moderate. Tooling is expensive. A container of 5,000 defective units is catastrophic.
      </P>

      <P>
        Build early. Test rigorously. Ask uncomfortable questions. Spend serious money only when the numbers and customer evidence prove the concept works.
      </P>

      <JournalDivider />

      <JournalTakeaways
        title="Summary & Key Takeaways"
        points={[
          "Never build tooling before validating customer willingness to pay and testing user interactions.",
          "DFM (Design for Manufacturability) bridges the gap between a fragile prototype and scalable factory production.",
          "Calculate full landed cost—including tooling amortization, packaging, freight, tariffs, and fulfillment.",
          "Implement structured third-party Quality Control (Pre-production, DUPRO, PSI) before releasing final factory payments.",
        ]}
      />

      <JournalFaq
        items={faqs}
        title="Frequently Asked Questions"
        description="Practical answers on hardware engineering, tooling investments, factory vetting, and quality control."
      />

      <JournalRelated
        currentSlug={post.slug}
        category={post.category}
      />
    </>
  );
}
