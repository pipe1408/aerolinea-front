import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function AccordionNav() {
  const menuItems = [
    {
      category: "Vuelos",
      items: [
        { name: "Electronics", href: "/products/electronics" },
        { name: "Clothing", href: "/products/clothing" },
        { name: "Books", href: "/products/books" },
      ],
    },
    {
      category: "Services",
      items: [
        { name: "Consulting", href: "/services/consulting" },
        { name: "Design", href: "/services/design" },
        { name: "Development", href: "/services/development" },
      ],
    },
    {
      category: "About",
      items: [
        { name: "Our Story", href: "/about/our-story" },
        { name: "Team", href: "/about/team" },
        { name: "Careers", href: "/about/careers" },
      ],
    },
  ]

  return (
    <Accordion type="single" collapsible className="w-full max-w-md">
      {menuItems.map((menuItem, index) => (
        <AccordionItem value={`item-${index}`} key={index}>
          <AccordionTrigger className="text-lg font-semibold">{menuItem.category}</AccordionTrigger>
          <AccordionContent>
            <ul className="py-2">
              {menuItem.items.map((item, itemIndex) => (
                <li key={itemIndex} className="py-2">
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}