import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Contact({ listing }) {
  const { currentUser } = useSelector((state) => state.user);
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState({ type: "", text: "" });
  const [sending, setSending] = useState(false);

  const onChange = (e) => {
    setMessage(e.target.value);
    if (status.text) setStatus({ type: "", text: "" });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || !landlord?.email) return;

    setSending(true);
    setStatus({ type: "", text: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientEmail: landlord.email,
          recipientName: landlord.username,
          listingName: listing.name,
          message,
          senderEmail: currentUser?.email,
        }),
      });
      const data = await res.json();

      if (res.status === 401) {
        throw new Error("Your session expired. Please sign in again.");
      }

      if (!res.ok) throw new Error(data.message || "Unable to send message.");

      setMessage("");
      setStatus({ type: "success", text: data.message });
    } catch (error) {
      setStatus({ type: "error", text: error.message });
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`, {
          credentials: "include",
        });
        if (!res.ok) return;

        // Try-Catch block inside json parsing
        const text = await res.text();
        if (!text) return;
        
        const data = JSON.parse(text);
        if (data.success === false) return;

        setLandlord(data);
      } catch (error) {
        console.log("Landlord fetch error:", error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
      <p>
        Contact{" "}
        <span className="font-semibold">
          {landlord ? landlord.username : "Landlord"}
        </span>{" "}
        for{" "}
        <span className="font-semibold">
          {listing.name ? listing.name.toLowerCase() : ""}
        </span>
      </p>

      <textarea
        name="message"
        id="message"
        rows="2"
        value={message}
        onChange={onChange}
        placeholder="Enter your message here..."
        className="w-full border p-3 rounded-lg"
      ></textarea>

      <button
        type="submit"
        disabled={sending || !landlord?.email || !message.trim()}
        className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
      >
        {sending ? "Sending..." : "Send Message"}
      </button>

      {status.text && (
        <p className={status.type === "success" ? "text-green-700" : "text-red-700"}>
          {status.text}
        </p>
      )}
    </form>
  );
}