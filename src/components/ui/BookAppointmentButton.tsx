interface BookAppointmentButtonProps {
  buttonText?: string;
  className?: string;
  onClick?: () => void;
}

export default function BookAppointmentButton({
  buttonText = "Book Appointment",
  className = "",
  onClick,
}: BookAppointmentButtonProps) {
  return (
    <button
      className={`px-6 py-3 bg-yellow-400 text-blue-900 rounded-full font-semibold shadow-lg hover:shadow-xl transition ${className}`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}
