# Dự án TinHoc

## Mô tả:
- Dự án TinHoc sẽ cung cấp một nền tảng thảo luận và chia sẻ kiến thức về tin học, cho phép người dùng tạo threads, trả lời threads, bình luận và đọc các bài viết chuyên môn.

## Công nghệ chính:
- Backend: Xây dựng bằng Django framework.
- Frontend: Xây dựng bằng NextJS framework.
- Database: PortgreSQL.

## Deadline:
- Dự án này được triển khai từ ngày 11/07 đến 11/08.

## Cấu trúc dự án:

1. Cấu trúc danh mục:
   - Category (Danh mục): Đại diện cho các danh mục chính trong lĩnh vực tin học.
   - Subcategory (Danh mục con): Mỗi danh mục chính sẽ chứa các danh mục con liên quan.
   - Topic (Lĩnh vực hoặc vấn đề cụ thể): Mỗi danh mục con sẽ chứa các lĩnh vực hoặc vấn đề cụ thể trong lĩnh vực đó.

2. Cấu trúc trang thảo luận:
   - Threads (Câu hỏi hoặc thảo luận cụ thể): Mỗi topic sẽ có các câu hỏi hoặc thảo luận cụ thể.
   - Replies (Phản hồi): Các phản hồi, bình luận, và xem xét được đưa ra trong threads.

3. Cấu trúc bài viết:
   - Articles (Bài viết): Các bài viết mang tính chuyên môn hoặc chia sẻ tổng quan về các lĩnh vực hoặc vấn đề trong topic.
   - Comments (Bình luận): Người dùng có thể bình luận trên mỗi bài viết.

4. Profiles (Hồ sơ người dùng):
   - Đăng nhập và đăng ký: Người dùng có thể đăng nhập và đăng ký bằng email hoặc tài khoản mạng xã hội như Facebook, Google, Twitter, v.v.
   - Field (Trường thông tin): Hồ sơ người dùng bao gồm thông tin như ảnh đại diện, tên người dùng, email, mật khẩu, họ và tên, vị trí địa lý.

5. Cấu trúc URL:

```bash
   + Cấu trúc category, subcategory, topic:
      - domain/category-slug/subcategory-slug/topic-slug/
   + Cấu trúc threads:
      - domain/threads/threads-slug-{threads-id}/
   + Cấu trúc replies:
      - domain/threads/threads-slug-{threads-id}/replies-{replies-id}/
   + Cấu trúc articles:
      - domain/articles/articles-slug-{articles-id}/
   + Cấu trúc profiles:
      - domain/profiles/{profiles-id}/
```

## Mô tả chức năng cụ thể:

+ Trang chủ (Homepage) hiển thị danh sách tất cả các danh mục (category).

+ Người dùng có thể duyệt vào danh mục (category) để xem các danh mục con (subcategory) và tiếp theo là các lĩnh vực hoặc vấn đề cụ thể (topic).

+ Các Threads:
   - Người dùng có quyền tạo threads trong topic và replies (trả lời) các threads.
   - Các threads sẽ chứa các câu hỏi hoặc vấn đề cụ thể liên quan đến topic đó.

+ Các articles:
   - Được hiển thị song song với threads.
   - Đây là những bài viết mang tính chuyên môn hoặc chia sẻ tổng quan về lĩnh vực hoặc vấn đề cụ thể (topic).
   - Người dùng có quyền bình luận (comments) trên mỗi article.

+ Ví dụ:
   - Nếu Category là Hardware (phần cứng), subcategory sẽ là: Input devices (thiết bị đầu vào), Output devices (thiết bị đầu ra), Memory (bộ nhớ), Storage (lưu trữ), v.v.
   - Nếu Subcategory là Input devices (thiết bị đầu vào), topic sẽ là: Keyboard (bàn phím), Mouse (chuột), Scanner (máy quét), v.v.
   - Nếu Topic là Keyboard (bàn phím), threads sẽ là: Is there any way to fix a faulty Caps Lock key on a mechanical keyboard (ABC layout)?

+ Quyền hạn:
   - Chỉ admin mới có quyền tạo category, subcategory, topic, và articles.
   - Người dùng đăng ký chỉ có quyền tạo threads, replies, và comments trên articles.

## Minh họa:

+ Source tree:
  
```bash
- Category (Hardware)
  |
  |- Subcategory (Input devices)
  |    |
  |    |- Topic (Keyboard)
  |    |    |
  |    |    |- Articles
  |    |    |    |
  |    |    |    |- Key criteria to consider when choosing a mechanical keyboard!
  |    |    |
  |    |    |- Threads
  |    |         |
  |    |         |- Is there any way to fix a faulty Caps Lock key on a mechanical keyboard (ABC layout)?
  |    |
  |- Subcategory (Output devices)
  |
  |- Subcategory (Central Processing Unit - CPU)
  |
  |- Subcategory (Memory)
  |
  |- Subcategory (Storage)
  |
  |- Subcategory (Graphics Card)
  |
  |- Subcategory (Motherboard)
  |
  |- Subcategory (Power Supply)
  |
  |- Subcategory (Connectivity Devices)
  |...
```

+ Dữ liệu mẫu:

```bash
- Category (Hardware)
  - Subcategory (Input devices)
    - Topic (Keyboard)
      - Articles
        - Key criteria to consider when choosing a mechanical keyboard!
      - Threads
        - Is there any way to fix a faulty Caps Lock key on a mechanical keyboard (ABC layout)?

    - Topic (Mouse)
    - Topic (Stylus)
    - Topic (Scanner)
    - Topic (Fingerprint scanner)
    - Topic (Camera)
    - Topic (Microphone)
    - ...

  - Subcategory (Output devices)
    - Topic (Monitor)
    - Topic (Printer)
    - Topic (Speaker)
    - Topic (Headphones)
    - Topic (Projector)
    - ...

  - Subcategory (Central Processing Unit - CPU)
    - Topic (CPU Architecture)
    - Topic (Cache Memory)
    - Topic (Processing Speed)
    - Topic (CPU Cores)
    - Topic (Manufacturing Technology)
    - Topic (Pipelining)
    - Topic (Control Unit)
    - Topic (CPU Interface)
    - Topic (Power and Performance)
    - ...

  - Subcategory (Memory)
    - Topic (RAM - Random Access Memory)
    - Topic (ROM - Read-Only Memory)
    - Topic (Cache Memory)
    - Topic (Flash Memory)
    - Topic (EEPROM - Electrically Erasable Programmable Read-Only Memory)
    - Topic (CPU Cache)
    - ...

  - Subcategory (Storage)
    - Topic (Hard drive)
    - Topic (Solid State Drive)
    - Topic (Hard Disk Drive)
    - Topic (USB flash drive)
    - Topic (Memory card)
    - Topic (Optical drive)
    - ...

  - Subcaterory (Graphics Card)
    - Topic (GPU - Graphics Processing Unit)
    - Topic (VRAM - Video RAM)
    - Topic (CUDA / OpenCL)
    - Topic (Display Outputs)
    - Topic (Cooling and Heat Management)
    - Topic (Overclocking)
    - Topic (DirectX / OpenGL / Vulkan)
    - ...

  - Subcategory (Motherboard)
    - Topic (Basic knowledge about the motherboard)
    - Topic (Types of motherboards)
    - Topic (Connection standards)
    - Topic (BIOS and UEFI)
    - Topic (Overclocking)
    - Topic (Compatibility)
    - Topic (Maintenance and repairs)
    - Topic (Emerging technologies)
    - ...

  - Subcategory (Power Supply)
    - Topic (Power Supply Types)
    - Topic (Wattage)
    - Topic (Efficiency)
    - Topic (Connection Standards)
    - Topic (Protection and Synchronization)
    - Topic (Cooling Fans)
    - Topic (Modular vs Non-modular Power Supply)
    - Topic (Markings and Certifications)
    - Topic (Compatibility and Installation)
    - ...

  - Subcategory (Connectivity Devices)
    - Topic (Router)
    - Topic (Switch)
    - Topic (Access Point)
    - Topic (Modem)
    - Topic (Bridge)
    - Topic (Network Interface Card - NIC)
    - Topic (Network Cable)
    - Topic (Wireless Network Adapter)
    - ...
```
