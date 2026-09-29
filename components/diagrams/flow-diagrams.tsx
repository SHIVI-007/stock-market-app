"use client";

import * as React from "react";
import {
  ArrowDown,
  Building2,
  Landmark,
  Network,
  ShieldCheck,
  UserRound,
  Wallet,
  Briefcase,
} from "lucide-react";

import { SimFrame } from "@/components/interactive/controls";
import { cn } from "@/lib/utils";

interface FlowNode {
  id: string;
  label: string;
  icon: React.ReactNode;
  text: string;
}

/** A clickable node in a flow diagram. */
function NodeButton({
  node,
  active,
  onClick,
}: {
  node: FlowNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active
          ? "border-primary bg-primary/10 text-primary"
          : "border-border bg-card hover:bg-muted/50",
      )}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-current/20">
        {node.icon}
      </span>
      <span className="text-sm font-medium">{node.label}</span>
    </button>
  );
}

function DetailPanel({ node }: { node: FlowNode }) {
  return (
    <div className="animate-fade-in-up rounded-xl border border-border bg-muted/30 p-5">
      <h4 className="font-semibold">{node.label}</h4>
      <p className="mt-1 text-sm text-muted-foreground">{node.text}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Exchange diagram                                                           */
/* -------------------------------------------------------------------------- */

const EXCHANGE_NODES: FlowNode[] = [
  {
    id: "company",
    label: "Company",
    icon: <Building2 className="size-4" />,
    text: "A business that decides to raise money by selling shares to the public. Once its shares are admitted to trading, it is 'listed'.",
  },
  {
    id: "listing",
    label: "Listed on an exchange",
    icon: <Landmark className="size-4" />,
    text: "Listing means the exchange has admitted the company's shares to trading and the company agrees to disclose information regularly.",
  },
  {
    id: "exchanges",
    label: "NSE / BSE",
    icon: <Landmark className="size-4" />,
    text: "India's two main exchanges. A company may be listed on one or both, and the same share can trade on both at broadly similar prices.",
  },
  {
    id: "broker",
    label: "Broker",
    icon: <Briefcase className="size-4" />,
    text: "A registered intermediary that routes your orders to the exchange and handles settlement. You trade through a broker, not directly with the exchange.",
  },
  {
    id: "investor",
    label: "Investor",
    icon: <UserRound className="size-4" />,
    text: "You. Your order travels from your trading account, through the broker, to the exchange, where it is matched with someone on the other side.",
  },
];

export function ExchangeDiagram() {
  const [activeId, setActiveId] = React.useState(EXCHANGE_NODES[0].id);
  const active = EXCHANGE_NODES.find((node) => node.id === activeId) ?? EXCHANGE_NODES[0];

  return (
    <SimFrame
      title="How a share reaches you"
      description="Click each step to see what that part of the chain actually does."
      icon={<Network className="size-4 text-primary" />}
      footer={
        <>
          Money moves in the opposite direction: from your broker to the seller, once the trade
          settles.
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-2">
          {EXCHANGE_NODES.map((node, index) => (
            <React.Fragment key={node.id}>
              <NodeButton node={node} active={node.id === activeId} onClick={() => setActiveId(node.id)} />
              {index < EXCHANGE_NODES.length - 1 ? (
                <div className="flex justify-center">
                  <ArrowDown className="size-4 text-muted-foreground" />
                </div>
              ) : null}
            </React.Fragment>
          ))}
        </div>
        <DetailPanel node={active} />
      </div>
    </SimFrame>
  );
}

/* -------------------------------------------------------------------------- */
/* Market structure diagram                                                   */
/* -------------------------------------------------------------------------- */

const STRUCTURE_NODES: FlowNode[] = [
  {
    id: "sebi",
    label: "SEBI — the regulator",
    icon: <ShieldCheck className="size-4" />,
    text: "The Securities and Exchange Board of India oversees the whole market: exchanges, brokers, intermediaries and listed companies. It exists chiefly to protect investors and keep markets fair.",
  },
  {
    id: "exchanges",
    label: "Stock exchanges (NSE, BSE)",
    icon: <Landmark className="size-4" />,
    text: "Organised marketplaces that match buy and sell orders and publish prices. They set rules and monitor trading.",
  },
  {
    id: "brokers",
    label: "Brokers",
    icon: <Briefcase className="size-4" />,
    text: "Registered intermediaries that place orders on your behalf. They must be registered with SEBI and, usually, a member of the exchange.",
  },
  {
    id: "clearing",
    label: "Clearing corporations",
    icon: <Network className="size-4" />,
    text: "Sit between the buyer and the seller after a trade to guarantee settlement, so neither side has to worry whether the other will honour the deal.",
  },
  {
    id: "depositories",
    label: "Depositories (NSDL, CDSL)",
    icon: <Wallet className="size-4" />,
    text: "Hold your securities electronically. Your demat account is your window into one of them.",
  },
  {
    id: "investors",
    label: "Investors",
    icon: <UserRound className="size-4" />,
    text: "Retail and institutional investors who buy and sell, providing the market with its liquidity.",
  },
];

export function MarketStructureDiagram() {
  const [activeId, setActiveId] = React.useState(STRUCTURE_NODES[0].id);
  const active = STRUCTURE_NODES.find((node) => node.id === activeId) ?? STRUCTURE_NODES[0];

  return (
    <SimFrame
      title="Who does what in the Indian market"
      description="A simple map of the institutions that make trading possible."
      icon={<Network className="size-4 text-primary" />}
      footer={
        <>
          This is a simplified map for learning. Each layer has detailed rules and responsibilities
          that go well beyond what is shown here.
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="grid gap-2 sm:grid-cols-2">
          {STRUCTURE_NODES.map((node) => (
            <NodeButton
              key={node.id}
              node={node}
              active={node.id === activeId}
              onClick={() => setActiveId(node.id)}
            />
          ))}
        </div>
        <DetailPanel node={active} />
      </div>
    </SimFrame>
  );
}

/* -------------------------------------------------------------------------- */
/* Account structure diagram                                                  */
/* -------------------------------------------------------------------------- */

const ACCOUNT_NODES: FlowNode[] = [
  {
    id: "bank",
    label: "Bank account",
    icon: <Landmark className="size-4" />,
    text: "Holds your money. When you buy shares, funds move from here (via your broker) to settle the trade.",
  },
  {
    id: "broker",
    label: "Broker",
    icon: <Briefcase className="size-4" />,
    text: "Connects your accounts to the exchange. Your trading account lives with the broker.",
  },
  {
    id: "trading",
    label: "Trading account",
    icon: <Briefcase className="size-4" />,
    text: "The account you use to place buy and sell orders. It does not hold your shares.",
  },
  {
    id: "exchange",
    label: "Exchange",
    icon: <Network className="size-4" />,
    text: "Where your order is matched against another investor's order.",
  },
  {
    id: "depository",
    label: "Depository (NSDL / CDSL)",
    icon: <Wallet className="size-4" />,
    text: "Holds the securities once you buy them. Your demat account is your view into the depository.",
  },
];

export function AccountStructureDiagram() {
  const [activeId, setActiveId] = React.useState(ACCOUNT_NODES[0].id);
  const active = ACCOUNT_NODES.find((node) => node.id === activeId) ?? ACCOUNT_NODES[0];

  return (
    <SimFrame
      title="Bank, trading and demat accounts"
      description="Three different accounts, three different jobs. Click each one."
      icon={<Wallet className="size-4 text-primary" />}
      footer={
        <>
          A common source of confusion: the trading account places orders, the demat account holds
          the shares, and the bank account holds the money.
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-2">
          {ACCOUNT_NODES.map((node, index) => (
            <React.Fragment key={node.id}>
              <NodeButton
                node={node}
                active={node.id === activeId}
                onClick={() => setActiveId(node.id)}
              />
              {index < ACCOUNT_NODES.length - 1 ? (
                <div className="flex justify-center">
                  <ArrowDown className="size-4 text-muted-foreground" />
                </div>
              ) : null}
            </React.Fragment>
          ))}
        </div>

        <div className="space-y-4">
          <DetailPanel node={active} />
          <div className="rounded-xl border border-dashed border-border p-4 text-xs text-muted-foreground">
            <p className="font-medium text-foreground">Money vs securities</p>
            <p className="mt-1">
              Money sits in the <strong>bank</strong>. Orders are placed from the{" "}
              <strong>trading account</strong>. Shares are held in the <strong>demat account</strong>.
            </p>
          </div>
        </div>
      </div>
    </SimFrame>
  );
}
