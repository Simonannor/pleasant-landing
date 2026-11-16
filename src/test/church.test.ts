import { describe, expect, it } from "vitest";
import { church, contact, leaders, services, socials } from "../lib/church";

describe("Church information", () => {
  it("lists Sunday service at 8:30 AM", () => expect(church.sundayService).toBe("8:30 AM"));
  it("locates the church at Achimota Mile 7 in Accra", () =>
    expect(church.location).toBe("Achimota Mile 7, Accra, Ghana"));
  it("lists Kaspong Ltd as the venue", () =>
    expect(church.venue).toBe("On the premises of Kaspong Ltd."));
  it("preserves the church mission", () =>
    expect(church.mission).toBe("Pleasing God, Serving Our Generation."));
  it("carries the theme of the year", () =>
    expect(church.theme).toBe("Season of Multiple Fruitfulness"));
  it("identifies the ministry school", () =>
    expect(church.ministry).toBe("The Father’s Heart School of Ministry"));
});

describe("Services schedule", () => {
  it("matches the Sunday card to the shared service time and location", () => {
    const sunday = services.find((s) => s.name === "Sunday Worship Service");
    expect(sunday?.time).toBe(church.sundayService);
    expect(sunday?.location).toBe(church.location);
    expect(sunday?.calendar).toBeTruthy();
  });
  it("offers four weekly gatherings", () => expect(services).toHaveLength(4));
  it("lists the mid-week rhythm: Tuesday class, Wednesday online study, Friday miracle hour", () => {
    const names = services.map((s) => s.name);
    expect(names).toContain("Discipleship Class");
    expect(names).toContain("Online Bible Studies");
    expect(names).toContain("Miracle Hour");
  });
  it("gathers the Wednesday study online and hides directions for it", () => {
    const online = services.find((s) => s.name === "Online Bible Studies");
    expect(online?.location).toBe("Online");
    expect(online?.directions).toBeNull();
  });
});

describe("Leadership", () => {
  it("names the head pastor", () => {
    const head = leaders.find((l) => l.role === "HEAD PASTOR");
    expect(head?.name).toBe("Rev. Dr. Michael Armah");
  });
  it("lists three associate pastors", () => {
    const associates = leaders.filter((l) => l.role === "ASSOCIATE PASTOR");
    expect(associates).toHaveLength(3);
    expect(associates.map((l) => l.name)).toEqual([
      "Pastor Emmanuel Sarpong",
      "Pastor Michael Ayer",
      "Pastor Anthony Dotse",
    ]);
  });
});

describe("Contact and socials", () => {
  it("lists the church phone line", () => expect(contact.phoneHref).toBe("tel:+233257809644"));
  it("links WhatsApp to the same line", () =>
    expect(contact.whatsapp).toBe("https://wa.me/233257809644"));
  it("points every social to its real profile", () => {
    const byLabel = new Map(socials.map((s) => [s.label, s.href]));
    expect(byLabel.get("Facebook")).toContain("facebook.com/p/Pleasant-Springs-Chapel");
    expect(byLabel.get("Instagram")).toBe("https://www.instagram.com/pleasantspringschapel/");
    expect(byLabel.get("TikTok")).toBe("https://www.tiktok.com/@pleasantspringschapel");
    expect(socials.every((s) => s.href.startsWith("https://"))).toBe(true);
  });
});
