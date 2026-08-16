"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import SmartPagination from "../gallery/Pagination";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoIosClose } from "react-icons/io";

type EventListItem = {
  _id: string;
  title: string;
  description: string;
  date: string; // ISO date string
  venue: string;
  time: string;
  tag: string;
  createdAt?: string;
};

const EMPTY_FORM = {
  title: "",
  description: "",
  date: "",
  venue: "",
  time: "",
  tag: "",
};

const AdminEventList = () => {
  const searchParams = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const [events, setEvents] = useState<EventListItem[] | []>([]);
  const [refetch, setRefetch] = useState(false);
  const [page, setPage] = useState(pageFromUrl);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  const pathname = usePathname();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Create modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState(EMPTY_FORM);
  const [creating, setCreating] = useState(false);

  // Edit modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventListItem | null>(null);
  const [editForm, setEditForm] = useState(EMPTY_FORM);
  const [updating, setUpdating] = useState(false);

  const resetCreateForm = () => setCreateForm(EMPTY_FORM);

  const openEditModal = (event: EventListItem) => {
    setEditingEvent(event);
    setEditForm({
      title: event.title,
      description: event.description,
      // <input type="date"> needs YYYY-MM-DD
      date: event.date ? event.date.slice(0, 10) : "",
      venue: event.venue,
      time: event.time,
      tag: event.tag,
    });
    setShowEditModal(true);
  };

  const resetEditForm = () => {
    setEditingEvent(null);
    setEditForm(EMPTY_FORM);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const changePage = (newPage: number) => {
    setPage(newPage);
    router.push(`${pathname}?page=${newPage}`);
  };

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const query = new URLSearchParams({
          page: String(page),
          limit: "10",
        });

        const response = await fetch(`/api/admin/event?${query.toString()}`);

        if (response.ok) {
          const data = await response.json();
          setEvents(data.data);
          setTotalPages(data.totalPages);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEventsData();
  }, [page, refetch]);

  const toggleSelectAll = () => {
    if (selectedIds.length === events.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(events.map((item) => item._id));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) {
      toast.error("No events selected");
      return;
    }

    try {
      const response = await fetch(`/api/admin/event/bulk-delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedIds }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setSelectedIds([]);
        setRefetch((prev) => !prev);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateEvent = async () => {
    if (!createForm.title.trim()) {
      toast.error("Event title is required");
      return;
    }

    if (!createForm.date.trim()) {
      toast.error("Event date is required");
      return;
    }

    if (!createForm.venue.trim()) {
      toast.error("Venue is required");
      return;
    }

    setCreating(true);
    try {
      const response = await fetch(`/api/admin/event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: createForm.title.trim(),
          description: createForm.description.trim(),
          date: createForm.date,
          venue: createForm.venue.trim(),
          time: createForm.time.trim(),
          tag: createForm.tag.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message ?? "Event created");
        resetCreateForm();
        setShowCreateModal(false);
        setRefetch((prev) => !prev);
      } else {
        toast.error(data.message ?? "Failed to create event");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create event");
    } finally {
      setCreating(false);
    }
  };

  const handleUpdateEvent = async () => {
    if (!editingEvent) return;

    if (!editForm.title.trim()) {
      toast.error("Event title is required");
      return;
    }

    if (!editForm.date.trim()) {
      toast.error("Event date is required");
      return;
    }

    if (!editForm.venue.trim()) {
      toast.error("Venue is required");
      return;
    }

    setUpdating(true);
    try {
      const response = await fetch(`/api/admin/event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: editingEvent._id,
          title: editForm.title.trim(),
          description: editForm.description.trim(),
          date: editForm.date,
          venue: editForm.venue.trim(),
          time: editForm.time.trim(),
          tag: editForm.tag.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message ?? "Event updated");
        resetEditForm();
        setShowEditModal(false);
        setRefetch((prev) => !prev);
      } else {
        toast.error(data.message ?? "Failed to update event");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update event");
    } finally {
      setUpdating(false);
    }
  };

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex min-h-[calc(100vh-200px)] flex-col gap-3">
        <div className="flex items-center justify-between gap-10 px-1">
          <div className="flex items-center justify-between">
            <h1 className="text-xl">Events</h1>
          </div>
          <div className="flex items-center gap-10">
            <div>
              {selectedIds.length > 0 && (
                <div className="relative inline-flex">
                  <MdDelete
                    className="cursor-pointer text-2xl text-red-600"
                    onClick={handleBulkDelete}
                  />
                  <span className="absolute -right-2 -top-2 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-red-600 text-[10px] text-white">
                    {selectedIds.length}
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              className="rounded bg-black px-4 py-2 text-white"
            >
              + Create Event
            </button>
          </div>
        </div>

        {events && events.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
            <table className="w-full text-left text-sm text-gray-700">
              <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === events.length}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Venue
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Tag
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody>
                {events.map((item, i) => (
                  <tr
                    key={item._id ?? i}
                    className="border-b border-gray-200 bg-white hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item._id)}
                        onChange={() => toggleSelect(item._id)}
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {item.title}
                    </td>
                    <td className="px-4 py-3">{formatDisplayDate(item.date)}</td>
                    <td className="px-4 py-3">{item.venue}</td>
                    <td className="px-4 py-3">
                      {item.tag && (
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">
                          {item.tag}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => openEditModal(item)}>
                        <MdEdit className="mx-auto text-lg" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>No events available</div>
        )}

        {showCreateModal && (
          <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="fixed inset-0 bg-gray-500/75 transition-opacity"
              aria-hidden="true"
            ></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative flex transform flex-col gap-5 overflow-hidden rounded-lg bg-white p-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Create New Event</h2>
                    <IoIosClose
                      className="cursor-pointer text-2xl"
                      onClick={() => {
                        setShowCreateModal(false);
                        resetCreateForm();
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-2 text-left">
                    <label className="text-sm font-semibold text-gray-600">
                      Title
                    </label>
                    <input
                      type="text"
                      value={createForm.title}
                      onChange={(e) =>
                        setCreateForm((f) => ({ ...f, title: e.target.value }))
                      }
                      placeholder="e.g. Annual Sports Day"
                      className="rounded border px-3 py-2"
                    />
                  </div>

                  <div className="flex flex-col gap-2 text-left">
                    <label className="text-sm font-semibold text-gray-600">
                      Description
                    </label>
                    <textarea
                      value={createForm.description}
                      onChange={(e) =>
                        setCreateForm((f) => ({
                          ...f,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Short description shown on the events page"
                      rows={3}
                      className="rounded border px-3 py-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2 text-left">
                      <label className="text-sm font-semibold text-gray-600">
                        Date
                      </label>
                      <input
                        type="date"
                        value={createForm.date}
                        onChange={(e) =>
                          setCreateForm((f) => ({ ...f, date: e.target.value }))
                        }
                        className="rounded border px-3 py-2"
                      />
                    </div>

                    <div className="flex flex-col gap-2 text-left">
                      <label className="text-sm font-semibold text-gray-600">
                        Time
                      </label>
                      <input
                        type="text"
                        value={createForm.time}
                        onChange={(e) =>
                          setCreateForm((f) => ({ ...f, time: e.target.value }))
                        }
                        placeholder="e.g. 7:00 AM – 6:00 PM"
                        className="rounded border px-3 py-2"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 text-left">
                    <label className="text-sm font-semibold text-gray-600">
                      Venue
                    </label>
                    <input
                      type="text"
                      value={createForm.venue}
                      onChange={(e) =>
                        setCreateForm((f) => ({ ...f, venue: e.target.value }))
                      }
                      placeholder="e.g. Community Ground"
                      className="rounded border px-3 py-2"
                    />
                  </div>

                  <div className="flex flex-col gap-2 text-left">
                    <label className="text-sm font-semibold text-gray-600">
                      Tag
                    </label>
                    <input
                      type="text"
                      value={createForm.tag}
                      onChange={(e) =>
                        setCreateForm((f) => ({ ...f, tag: e.target.value }))
                      }
                      placeholder="e.g. Sports, Cultural, Festival"
                      className="rounded border px-3 py-2"
                    />
                  </div>

                  <div className="gap-2 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      disabled={creating}
                      className="shadow-xs inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50 sm:w-auto"
                      onClick={handleCreateEvent}
                    >
                      {creating ? "Creating..." : "Create"}
                    </button>
                    <button
                      type="button"
                      className="shadow-xs mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => {
                        setShowCreateModal(false);
                        resetCreateForm();
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showEditModal && (
          <div
            className="relative z-10"
            aria-labelledby="edit-modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="fixed inset-0 bg-gray-500/75 transition-opacity"
              aria-hidden="true"
            ></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative flex transform flex-col gap-5 overflow-hidden rounded-lg bg-white p-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Edit Event</h2>
                    <IoIosClose
                      className="cursor-pointer text-2xl"
                      onClick={() => {
                        setShowEditModal(false);
                        resetEditForm();
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-2 text-left">
                    <label className="text-sm font-semibold text-gray-600">
                      Title
                    </label>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) =>
                        setEditForm((f) => ({ ...f, title: e.target.value }))
                      }
                      placeholder="e.g. Annual Sports Day"
                      className="rounded border px-3 py-2"
                    />
                  </div>

                  <div className="flex flex-col gap-2 text-left">
                    <label className="text-sm font-semibold text-gray-600">
                      Description
                    </label>
                    <textarea
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm((f) => ({
                          ...f,
                          description: e.target.value,
                        }))
                      }
                      rows={3}
                      className="rounded border px-3 py-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2 text-left">
                      <label className="text-sm font-semibold text-gray-600">
                        Date
                      </label>
                      <input
                        type="date"
                        value={editForm.date}
                        onChange={(e) =>
                          setEditForm((f) => ({ ...f, date: e.target.value }))
                        }
                        className="rounded border px-3 py-2"
                      />
                    </div>

                    <div className="flex flex-col gap-2 text-left">
                      <label className="text-sm font-semibold text-gray-600">
                        Time
                      </label>
                      <input
                        type="text"
                        value={editForm.time}
                        onChange={(e) =>
                          setEditForm((f) => ({ ...f, time: e.target.value }))
                        }
                        placeholder="e.g. 7:00 AM – 6:00 PM"
                        className="rounded border px-3 py-2"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 text-left">
                    <label className="text-sm font-semibold text-gray-600">
                      Venue
                    </label>
                    <input
                      type="text"
                      value={editForm.venue}
                      onChange={(e) =>
                        setEditForm((f) => ({ ...f, venue: e.target.value }))
                      }
                      placeholder="e.g. Community Ground"
                      className="rounded border px-3 py-2"
                    />
                  </div>

                  <div className="flex flex-col gap-2 text-left">
                    <label className="text-sm font-semibold text-gray-600">
                      Tag
                    </label>
                    <input
                      type="text"
                      value={editForm.tag}
                      onChange={(e) =>
                        setEditForm((f) => ({ ...f, tag: e.target.value }))
                      }
                      placeholder="e.g. Sports, Cultural, Festival"
                      className="rounded border px-3 py-2"
                    />
                  </div>

                  <div className="gap-2 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      disabled={updating}
                      className="shadow-xs inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50 sm:w-auto"
                      onClick={handleUpdateEvent}
                    >
                      {updating ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      type="button"
                      className="shadow-xs mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => {
                        setShowEditModal(false);
                        resetEditForm();
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {events && events.length > 0 && (
        <div className="mb-10">
          <SmartPagination page={page} totalPages={totalPages} setPage={changePage} />
        </div>
      )}
    </div>
  );
};

export default AdminEventList;