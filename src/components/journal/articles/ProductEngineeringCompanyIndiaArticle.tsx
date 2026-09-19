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

export const tocIndiaGuide = [
  { id: "what-is-product-engineering-company", text: "What Is a Product Engineering Company?" },
  { id: "dev-vs-engineering", text: "Product Development vs Product Engineering" },
  { id: "india-tech-hub", text: "Why India Has Become an Important Engineering Hub" },
  { id: "what-company-should-do", text: "What Should a Product Engineering Company Actually Do?" },
  { id: "people-behind-engineering", text: "The People Behind Product Engineering" },
  { id: "engagement-models", text: "What Does an Engagement Look Like?" },
  { id: "evaluating-partners", text: "What Should a Founder Look For?" },
  { id: "questions-to-ask", text: "The Critical Questions to Ask Before Hiring" },
  { id: "services-offered", text: "Services Offered by Indian Engineering Firms" },
  { id: "cost-breakdown", text: "How Much Does It Cost?" },
  { id: "inhouse-vs-partner", text: "In-House Team vs Product Engineering Partner" },
  { id: "when-to-hire", text: "When Should a Startup Hire a Partner?" },
  { id: "common-mistakes", text: "Common Mistakes When Choosing a Partner" },
  { id: "five-evaluation-pillars", text: "How to Evaluate: 5 Key Pillars" },
  { id: "ownership-the-key", text: "The Most Important Thing: Ownership" },
  { id: "faq", text: "Frequently Asked Questions" },
];

const faqs: FaqItem[] = [
  {
    question: "What is a product engineering company?",
    answer:
      "A product engineering company helps businesses design, build, launch, scale, and continuously improve technology products. Its work spans product strategy, UX/UI design, software engineering, cloud, AI, quality engineering, DevOps, and ongoing lifecycle development.",
  },
  {
    question: "What is the difference between a software development company and a product engineering company?",
    answer:
      "A software development vendor typically implements predefined requirements without questioning product viability. A product engineering partner takes a holistic approach across Problem → Product → Design → Architecture → Development → Testing → Launch → Continuous Improvement.",
  },
  {
    question: "Why choose a product engineering company in India?",
    answer:
      "India has a deep multidisciplinary talent ecosystem spanning SaaS, cloud architecture, AI/ML, embedded electronics, and digital platforms. Working with the right Indian engineering partner provides access to high-seniority architects and rapid development without huge upfront local hiring overhead.",
  },
  {
    question: "How much does product engineering cost in India?",
    answer:
      "Pricing varies based on complexity, team seniority, hardware/software integration, security compliance, and ongoing support. High-performing engineering teams should be evaluated on team structure, architecture ownership, and long-term maintainability rather than pure hourly rates.",
  },
  {
    question: "What should an MVP include?",
    answer:
      "An MVP should contain only enough functionality to test your most critical assumptions with real users. If an MVP has 40+ features, you have accidentally built version 4.0 and given it an optimistic label.",
  },
  {
    question: "What single question should I ask before hiring an engineering partner?",
    answer:
      "Ask: 'If this were your company, what would you build first—and what would you deliberately NOT build?' A true engineering partner will challenge assumptions and cut unnecessary complexity.",
  },
];

export function ProductEngineeringCompanyIndiaArticle({ post }: { post: JournalPostMeta }) {
  return (
    <>
      <P lead>
        There is a point in almost every product journey when the idea stops being exciting and starts becoming complicated.
      </P>

      <P>
        At first, everything looks simple. You have a problem. You have an idea. Maybe you have some sketches, a prototype, or a surprisingly convincing Figma file. Then someone asks: <Span variant="bold">“Who is going to build this?”</Span>
      </P>

      <P>
        That is usually when the fun begins. Because you are not really looking for someone who can write code. You are looking for a team that can make hundreds of decisions about your product—architecture, technology, UX, security, scalability, timelines, trade-offs, and sometimes even whether the feature you are asking for should exist in the first place.
      </P>

      <P>
        A development team can build what you specify. A good <Span variant="highlight">product engineering team</Span> helps you figure out what is worth building, how it should be built, and how to keep it working when the product inevitably becomes more complicated.
      </P>

      <H2 id="what-is-product-engineering-company">What Is a Product Engineering Company?</H2>

      <P>
        In simple terms, a product engineering company helps businesses design, build, launch, and continuously improve technology products. That includes product discovery, UX/UI, MVP development, backend APIs, cloud infrastructure, AI, quality engineering, and product modernization.
      </P>

      <P>
        A website can have an impressive services page packed with buzzwords: AI, cloud, microservices, DevOps, blockchain. That does not automatically mean the team knows what to build. Product engineering is less about the number of technologies a company knows and more about the quality of decisions it makes.
      </P>

      <JournalCallout variant="insight" title="The Essential Question">
        Can this team help me build the right product, not just build the product I describe?
      </JournalCallout>

      <H2 id="dev-vs-engineering">Product Development vs Product Engineering</H2>

      <P>
        Traditional software development begins with a clear requirement: <Span variant="italic">“We need this feature.”</Span> The team estimates it, builds it, tests it, and ships it.
      </P>

      <P>
        Product engineering starts a little earlier. It asks: <Span variant="bold">“Why do we need this feature?”</Span> And sometimes the answer is surprisingly weak. Maybe customers don&apos;t need it. Maybe there is a simpler way. Maybe building it now creates an architectural mess that everyone will spend three years apologizing for.
      </P>

      {/* Comparison Table */}
      <Table caption="Table 1: Product Development vs. Product Engineering">
        <THead>
          <TR>
            <TH>Dimension</TH>
            <TH>Product Development</TH>
            <TH>Product Engineering</TH>
          </TR>
        </THead>
        <TBody>
          <TR>
            <TD variant="bold">Core Focus</TD>
            <TD>Implementation of tasks</TD>
            <TD variant="mint">Product and business outcomes</TD>
          </TR>
          <TR>
            <TD variant="bold">Requirement Handling</TD>
            <TD>Starts with defined requirements</TD>
            <TD variant="mint">Actively shapes &amp; validates requirements</TD>
          </TR>
          <TR>
            <TD variant="bold">Architecture Strategy</TD>
            <TD>Supports immediate sprint needs</TD>
            <TD variant="mint">Considers future evolution &amp; maintainability</TD>
          </TR>
          <TR>
            <TD variant="bold">Quality Philosophy</TD>
            <TD>Validates functionality at the end</TD>
            <TD variant="mint">Engineered throughout the lifecycle</TD>
          </TR>
          <TR>
            <TD variant="bold">Success Metric</TD>
            <TD>Shipping code</TD>
            <TD variant="mint">Building a useful product that keeps evolving</TD>
          </TR>
        </TBody>
      </Table>

      <H2 id="india-tech-hub">Why India Has Become an Important Engineering Hub</H2>

      <P>
        India&apos;s technology industry has evolved far beyond traditional IT outsourcing. Today, India is home to a world-class product ecosystem spanning global SaaS enterprises (Freshworks, Zoho), fintech unicorns, AI labs, and deep-tech hardware innovators.
      </P>

      <P>
        You don&apos;t need a massive, bureaucratic organization to build a serious product. You need people who understand the problem, make sound architectural trade-offs, and know what not to build.
      </P>

      <H2 id="what-company-should-do">What Should a Product Engineering Company Actually Do?</H2>

      <JournalCallout variant="science" title="The Complete Product Journey">
        <Span variant="bold">Problem → Discovery → Strategy → Design → Architecture → Development → Testing → Launch → Monitoring → Learning → Improvement</Span>
      </JournalCallout>

      <P>
        Notice that coding is only one link in the chain. Products rarely fail because someone couldn&apos;t write a function. They fail because the team solved the wrong problem, over-engineered too early, or ignored operational maintenance.
      </P>

      <H2 id="people-behind-engineering">The People Behind Product Engineering</H2>

      <JournalUL>
        <LI><Span variant="bold">Product Managers:</Span> Connect business goals with user pain points and define measurable metrics.</LI>
        <LI><Span variant="bold">Software &amp; Hardware Engineers:</Span> Design robust architectures, APIs, firmware, and maintainable systems.</LI>
        <LI><Span variant="bold">UX/UI Designers:</Span> Create intuitive interaction flows, wireframes, and design systems.</LI>
        <LI><Span variant="bold">QA &amp; Quality Engineers:</Span> Identify the edge cases everyone else forgot.</LI>
        <LI><Span variant="bold">DevOps &amp; Cloud Engineers:</Span> Ensure systems deploy reliably and survive outside the developer&apos;s laptop.</LI>
      </JournalUL>

      <H2 id="engagement-models">What Does an Engagement Look Like?</H2>

      <P>
        Engagements should fit the specific problem: product discovery, architecture reviews, MVP builds, platform modernization, or dedicated cross-functional engineering pods.
      </P>

      <H2 id="evaluating-partners">What Should a Founder Look For?</H2>

      <JournalOL>
        <LI><Span variant="bold">Do they understand the business problem</Span> before pitching technology stacks?</LI>
        <LI><Span variant="bold">Can they challenge your ideas</Span> and tell you what NOT to build?</LI>
        <LI><Span variant="bold">Can they explain technical decisions clearly</Span> without hiding behind acronyms?</LI>
        <LI><Span variant="bold">Who actually owns the work</Span> and takes accountability when things go wrong?</LI>
      </JournalOL>

      <H2 id="questions-to-ask">The Critical Questions to Ask Before Hiring</H2>

      <P>
        Meet the actual technical lead and architects who will work on your codebase daily. Ask:
      </P>

      <JournalUL>
        <LI>Who owns architecture and technical debt?</LI>
        <LI>How frequently will we see working software demos?</LI>
        <LI>What is your automated testing and security strategy?</LI>
        <LI>Who owns the intellectual property and source code? (Answer must always be you.)</LI>
        <LI>What happens after launch when real users arrive?</LI>
      </JournalUL>

      <H2 id="services-offered">Services Offered by Indian Engineering Firms</H2>

      <P>
        Core services span Product Discovery, UX Design, Full-Stack Software Engineering, Cloud &amp; DevOps Automation, Quality Engineering, AI &amp; Data Pipelines, and Legacy Product Modernization.
      </P>

      <H2 id="cost-breakdown">How Much Does It Cost?</H2>

      <P>
        A proposal that is 20% cheaper on paper can become 200% more expensive if poor architecture causes three months of complete rewrite. Compare proposals based on team seniority, engineering ownership, automated testing coverage, and post-launch support.
      </P>

      <H2 id="inhouse-vs-partner">In-House Team vs Product Engineering Partner</H2>

      <P>
        For an early-stage company, building an entire in-house department (PM, design, frontend, backend, QA, DevOps, security) is slow and prohibitively expensive. A partner provides immediate multidisciplinary maturity. As you scale, you can transition core components in-house while retaining partner specialists for specialized domains.
      </P>

      <H2 id="when-to-hire">When Should a Startup Hire a Partner?</H2>

      <JournalUL>
        <LI>You have a validated concept but no internal engineering team.</LI>
        <LI>You need to launch a crisp MVP without burning a year of runway.</LI>
        <LI>Your existing team is overwhelmed maintaining current systems.</LI>
        <LI>Your platform needs deep architectural refactoring to scale traffic.</LI>
        <LI>You need specialized hardware, embedded firmware, or AI expertise.</LI>
      </JournalUL>

      <H2 id="common-mistakes">Common Mistakes When Choosing a Partner</H2>

      <JournalOL>
        <LI><Span variant="bold">Choosing solely on the lowest hourly rate.</Span></LI>
        <LI><Span variant="bold">Falling for buzzwords</Span> rather than proven, maintainable systems.</LI>
        <LI><Span variant="bold">Assuming the sales team represents the delivery team.</Span></LI>
        <LI><Span variant="bold">Building too much too early</Span> (inflating the MVP into version 4.0).</LI>
        <LI><Span variant="bold">Ignoring post-launch operations and observability.</Span></LI>
      </JournalOL>

      <H2 id="five-evaluation-pillars">How to Evaluate: 5 Key Pillars</H2>

      <JournalUL>
        <LI><Span variant="bold">Product Thinking:</Span> Grasping user economics, trade-offs, and customer pain points.</LI>
        <LI><Span variant="bold">Technical Depth:</Span> Designing pragmatic architectures that avoid future bottlenecks.</LI>
        <LI><Span variant="bold">Transparent Communication:</Span> Flagging roadblocks proactively.</LI>
        <LI><Span variant="bold">End-to-End Ownership:</Span> Treating the product outcome as their own.</LI>
        <LI><Span variant="bold">Long-Term Vision:</Span> Structuring systems for longevity.</LI>
      </JournalUL>

      <H2 id="ownership-the-key">The Most Important Thing: Ownership</H2>

      <P>
        The difference between a code shop and an engineering partner comes down to one word: <Span variant="bold">Ownership</Span>.
      </P>

      <JournalQuote author="Hanish Jyosyabhatla">
        Founders don&apos;t really need more people who can turn requirements into tickets. They need people who can help them make better decisions.
      </JournalQuote>

      <JournalDivider />

      <JournalTakeaways
        title="Summary & Takeaways"
        points={[
          "A product engineering company helps shape what to build, not just execute tickets without question.",
          "India's engineering landscape offers high-calibre product builders when you evaluate technical depth and ownership over hourly rates.",
          "Keep MVPs focused on validating core assumptions—avoid over-engineering before market validation.",
          "True engineering partners take ownership of architecture, quality, deployment, and post-launch reliability.",
        ]}
      />

      <JournalFaq
        items={faqs}
        title="Frequently Asked Questions"
        description="Key questions about partnering with product engineering companies in India, costs, and engagement models."
      />

      <JournalRelated
        currentSlug={post.slug}
        category={post.category}
      />
    </>
  );
}
